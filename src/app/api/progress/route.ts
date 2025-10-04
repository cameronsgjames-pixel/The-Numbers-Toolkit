import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      },
      include: {
        progress: {
          include: {
            lesson: {
              include: {
                product: true
              }
            }
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user.progress)
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const body = await request.json()
    const { lesson_id, completed, progress, time_spent } = body

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Upsert user progress
    const userProgress = await prisma.userProgress.upsert({
      where: {
        user_id_lesson_id: {
          user_id: user.id,
          lesson_id: lesson_id
        }
      },
      update: {
        completed,
        progress: progress || 0,
        time_spent: time_spent || 0,
        last_accessed: new Date()
      },
      create: {
        user_id: user.id,
        lesson_id: lesson_id,
        completed,
        progress: progress || 0,
        time_spent: time_spent || 0
      }
    })

    return NextResponse.json(userProgress)
  } catch (error) {
    console.error('Error updating progress:', error)
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}
