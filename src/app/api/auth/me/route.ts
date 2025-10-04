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
        purchases: {
          include: {
            product: true
          }
        },
        progress: {
          include: {
            lesson: {
              include: {
                product: true
              }
            }
          }
        },
        achievements: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Transform progress data from UserProgress records
    const progressData: Record<string, number> = {}
    user.progress.forEach(progress => {
      const key = `${progress.lesson.product_id}_lesson_${progress.lesson_id}`
      progressData[key] = progress.progress
    })

    // Transform the data to match the expected format
    const transformedUser = {
      ...user,
      purchased_product_ids: user.purchases
        .filter(p => p.status === 'completed')
        .map(p => p.product_id),
      badges: user.achievements || [],
      progress: progressData,
      completed_products: user.completed_products || []
    }

    return NextResponse.json(transformedUser)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const body = await request.json()
    const { progress, completed_products, points } = body

    // Get user first
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update user progress records
    if (progress) {
      for (const [key, value] of Object.entries(progress)) {
        if (key.includes('_lesson_')) {
          // Extract lesson ID from key (format: productId_lesson_lessonId)
          const lessonId = key.split('_lesson_')[1]
          
          // Upsert user progress record
          await prisma.userProgress.upsert({
            where: {
              user_id_lesson_id: {
                user_id: user.id,
                lesson_id: lessonId
              }
            },
            update: {
              completed: value === 100,
              progress: value as number,
              last_accessed: new Date()
            },
            create: {
              user_id: user.id,
              lesson_id: lessonId,
              completed: value === 100,
              progress: value as number,
              last_accessed: new Date()
            }
          })
        }
      }
    }

    // Update user data
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email
      },
      data: {
        completed_products: completed_products,
        points: points
      }
    })

    return NextResponse.json({ success: true, user: updatedUser })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}