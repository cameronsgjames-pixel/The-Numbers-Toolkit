import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { productId, successUrl, cancelUrl } = body

    // Get the product
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        },
      })
    }

    // Check if this is the "Buy All Courses" bundle
    const isBundleProduct = product.key === 'complete_bundle'
    
    let lineItems: any[] = []
    let metadata: any = {
      userId: user.id,
      productId: product.id,
    }

    if (isBundleProduct) {
      // For bundle, get all individual courses and create line items for each
      const allCourses = await prisma.product.findMany({
        where: {
          is_active: true,
          sort_order: { gte: 1, lt: 10 }, // Exclude the bundle itself (sortOrder 10)
          key: { not: 'complete_bundle' } // Also exclude by key for safety
        },
        orderBy: { sort_order: 'asc' }
      })

      // Get existing purchases for this user to avoid charging for courses they already own
      const existingPurchases = await prisma.purchase.findMany({
        where: {
          user_id: user.id,
          product_id: { in: allCourses.map(c => c.id) },
          status: 'completed'
        },
        select: { product_id: true }
      })

      const existingProductIds = existingPurchases.map(p => p.product_id)
      const newCourses = allCourses.filter(course => !existingProductIds.includes(course.id))

      // Only create line items for courses the user doesn't already own
      lineItems = newCourses.map(course => ({
        price_data: {
          currency: 'aud',
          product_data: {
            name: course.name,
            description: course.description || '',
          },
          unit_amount: Math.round(course.price * 100), // Convert to cents
        },
        quantity: 1,
      }))

      // Add metadata for all course IDs (including ones they already own for webhook processing)
      metadata.allCourseIds = allCourses.map(c => c.id).join(',')
      metadata.newCourseIds = newCourses.map(c => c.id).join(',')
    } else {
      // For individual courses, create single line item
      lineItems = [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: product.name,
              description: product.description || '',
            },
            unit_amount: Math.round(product.price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ]
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment-cancel`,
      customer_email: user.email,
      metadata,
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
