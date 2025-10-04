import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const courseType = searchParams.get('course_type')
    const includeLessons = searchParams.get('include_lessons') === 'true'

    const where: any = {
      is_active: true,
    }

    if (courseType) {
      where.course_type = courseType
    }

    const products = await prisma.product.findMany({
      where,
      include: includeLessons ? {
        lessons: {
          where: {
            is_active: true,
          },
          orderBy: {
            sort_order: 'asc',
          },
        },
      } : undefined,
      orderBy: {
        sort_order: 'asc',
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, stripe_id, sort_order, key, course_type, display_price, content_data } = body

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stripe_id,
        sort_order: sort_order || 0,
        key,
        course_type: course_type || 'individual',
        display_price,
        content_data,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
