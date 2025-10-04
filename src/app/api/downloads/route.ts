import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const downloads = await prisma.download.findMany({
      where: {
        is_active: true,
      },
      orderBy: {
        sort_order: 'asc',
      },
    })

    return NextResponse.json(downloads)
  } catch (error) {
    console.error('Error fetching downloads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch downloads' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, fileUrl, fileSize, sort_order } = body

    const download = await prisma.download.create({
      data: {
        title,
        description,
        fileUrl,
        fileSize,
        sort_order: sort_order || 0,
      },
    })

    return NextResponse.json(download)
  } catch (error) {
    console.error('Error creating download:', error)
    return NextResponse.json(
      { error: 'Failed to create download' },
      { status: 500 }
    )
  }
}
