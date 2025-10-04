import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    if (!productId) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      },
      include: {
        purchases: {
          include: {
            product: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user has access to this product
    const hasAccess = user.purchases.some(purchase => 
      purchase.status === 'completed' && 
      (purchase.product_id === productId || purchase.product_id === 'complete_bundle')
    )

    return NextResponse.json({ 
      hasAccess,
      productId,
      accessibleProducts: user.purchases
        .filter(p => p.status === 'completed')
        .map(p => p.product_id)
    })
  } catch (error) {
    console.error('Error checking product access:', error)
    return NextResponse.json(
      { error: 'Failed to check access' },
      { status: 500 }
    )
  }
}
