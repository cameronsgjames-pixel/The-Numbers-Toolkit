import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    const where: any = {
      is_active: true,
    }

    if (productId) {
      where.product_id = productId
    }

    const lessons = await prisma.lesson.findMany({
      where,
      include: {
        product: true,
      },
      orderBy: [
        { sort_order: 'asc' },
      ],
    })

    return NextResponse.json(lessons)
  } catch (error) {
    console.error('Error fetching lessons:', error)
    return NextResponse.json(
      { error: 'Failed to fetch lessons' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, content, video_url, practice_sheet_url, duration, sort_order, product_id } = body

    const lesson = await prisma.lesson.create({
      data: {
        title,
        description,
        content,
        video_url,
        practice_sheet_url,
        duration,
        sort_order: sort_order || 0,
        product_id,
      },
    })

    return NextResponse.json(lesson)
  } catch (error) {
    console.error('Error creating lesson:', error)
    return NextResponse.json(
      { error: 'Failed to create lesson' },
      { status: 500 }
    )
  }
}
