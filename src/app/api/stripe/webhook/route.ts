import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Store the event in the database
    await prisma.stripeEvent.create({
      data: {
        eventId: event.id,
        type: event.type,
        data: event.data as any,
      },
    })

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        if (session.payment_status === 'paid') {
          const userId = session.metadata?.userId
          const productId = session.metadata?.productId
          const allCourseIds = session.metadata?.allCourseIds
          const newCourseIds = session.metadata?.newCourseIds

          if (userId && productId) {
            // Check if this is a bundle purchase
            if (allCourseIds) {
              // For bundle purchases, create purchase records only for courses that were actually charged
              const courseIdsToProcess = newCourseIds ? newCourseIds.split(',') : allCourseIds.split(',')
              
              // Only create purchase records for courses the user was charged for
              for (const courseId of courseIdsToProcess) {
                await prisma.purchase.create({
                  data: {
                    user_id: userId,
                    product_id: courseId,
                    stripe_id: `${session.id}_${courseId}`, // Unique stripe ID for each course
                    amount: session.amount_total ? (session.amount_total / 100) / courseIdsToProcess.length : 0, // Split amount across courses
                    status: 'completed',
                  },
                })
              }
              
              // Also create a purchase record for the bundle itself
              await prisma.purchase.create({
                data: {
                  user_id: userId,
                  product_id: productId,
                  stripe_id: session.id,
                  amount: session.amount_total ? session.amount_total / 100 : 0,
                  status: 'completed',
                },
              })
            } else {
              // For individual course purchases
              await prisma.purchase.create({
                data: {
                  user_id: userId,
                  product_id: productId,
                  stripe_id: session.id,
                  amount: session.amount_total ? session.amount_total / 100 : 0,
                  status: 'completed',
                },
              })
            }
          }
        }
        break
      }
      
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`Payment intent succeeded: ${paymentIntent.id}`)
        
        // Update purchase status if exists
        await prisma.purchase.updateMany({
          where: {
            stripe_id: paymentIntent.id,
          },
          data: {
            status: 'completed',
          },
        })
        break
      }
      
      case 'payment_intent.created': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`Payment intent created: ${paymentIntent.id}`)
        // No action needed for created events, just log
        break
      }
      
      case 'charge.succeeded': {
        const charge = event.data.object as Stripe.Charge
        console.log(`Charge succeeded: ${charge.id}`)
        // No action needed for charge succeeded events, just log
        break
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`Payment intent failed: ${paymentIntent.id}`)
        
        // Update purchase status if exists
        await prisma.purchase.updateMany({
          where: {
            stripe_id: paymentIntent.id,
          },
          data: {
            status: 'failed',
          },
        })
        break
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
