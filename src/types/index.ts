import { User, Product, Lesson, Download, Purchase, Achievement, UserProgress } from '@prisma/client'

export type UserWithProgress = User & {
  progress: UserProgress[]
  achievements: Achievement[]
  purchases: Purchase[]
  purchased_product_ids?: string[]
  badges?: any[]
}

export type LessonWithProgress = Lesson & {
  progress: UserProgress[]
  product?: Product
}

export type ProductWithLessons = Product & {
  lessons: Lesson[]
}

export type PurchaseWithProduct = Purchase & {
  product: Product
}

export type UserProgressWithLesson = UserProgress & {
  lesson: Lesson & {
    product: Product
  }
}

export interface CourseData {
  products: ProductWithLessons[]
  user: UserWithProgress | null
}

export interface LessonProgress {
  lessonId: string
  completed: boolean
  progress: number
  timeSpent: number
}

export interface AchievementData {
  id: string
  title: string
  description: string
  icon?: string
  points: number
  earnedAt: Date
}

export interface WeekData {
  id: string
  week_number: number
  title: string
  description: string
  content_data: any // JSONB content from product
  lessons: Array<{
    id: string
    title: string
    description: string
    content?: string
    video_url?: string
    practice_sheet_url?: string
    duration?: number
    sort_order: number
    is_active: boolean
    product_id: string
  }>
}
