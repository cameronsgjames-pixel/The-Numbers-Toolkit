'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Download, Clock, Target, CheckCircle, ArrowLeft, ArrowRight, Lock, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import LessonCard from '../course/LessonCard'
import { useUser } from '@/hooks/useUser'
import { useUserStore } from '@/store/useUserStore'

interface ProductData {
  id: string
  name: string
  description: string
  price: number
  sort_order: number
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

export default function ProductPage() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('product')
  const [productData, setProductData] = useState<ProductData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // User state and access control
  const { user, isLoading: userLoading, isAuthenticated } = useUser()
  const { hasAccessToProduct, hasAccessToLesson, setUser } = useUserStore()

  useEffect(() => {
    if (productId) {
      loadProductData()
    }
  }, [productId])

  const loadProductData = async () => {
    try {
      setLoading(true)
      
      // First check if user has access to this product
      const accessResponse = await fetch(`/api/products/access?productId=${productId}`)
      if (!accessResponse.ok) {
        setError('Access denied')
        return
      }
      
      const accessData = await accessResponse.json()
      if (!accessData.hasAccess) {
        setError('You do not have access to this product')
        return
      }
      
      // Load product data if access is granted
      const response = await fetch(`/api/products/${productId}?include_lessons=true`)
      if (response.ok) {
        const data = await response.json()
        setProductData(data)
      } else {
        setError('Product not found')
      }
    } catch (err) {
      setError('Failed to load product data')
      console.error('Error loading product:', err)
    } finally {
      setLoading(false)
    }
  }


  const handleLessonComplete = async (productId: string, lessonId: string) => {
    if (!user) {
      console.error("User not logged in, cannot mark lesson complete.");
      return;
    }

    try {
      const lessonKey = `${productId}_lesson_${lessonId}`;
      const updatedProgress = {
        ...(user.progress || {}), // Initialize if null/undefined
        [lessonKey]: 100
      };

      // Calculate product progress
      const totalLessons = productData?.lessons.length || 0;
      const completedLessons = Object.keys(updatedProgress)
        .filter(key => key.startsWith(`${productId}_lesson_`) && updatedProgress[key] === 100)
        .length;
      
      const productProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
      updatedProgress[productId] = productProgress;

      // Check if product is complete and update completed_products
      let completedProducts = user.completed_products || [];
      let points = user.points || 0;
      
      if (productProgress === 100 && !completedProducts.includes(productId)) {
        completedProducts = [...completedProducts, productId];
        points = (points || 0) + 100; // Award 100 points per completed product
      }

      console.log('Updating lesson progress:', {
        lessonKey,
        updatedProgress,
        completedProducts,
        points
      });

      // Update user data via API
      const response = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          progress: updatedProgress,
          completed_products: completedProducts,
          points: points
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Lesson completion successful:', result);
        
        // Update the user store with new progress
        setUser({
          ...user,
          progress: updatedProgress,
          completed_products: completedProducts,
          points: points
        });
        
        // Show success message (optional)
        alert('Lesson completed successfully!');
      } else {
        const errorData = await response.json();
        console.error('Failed to update lesson progress:', errorData);
        alert('Failed to mark lesson as complete. Please try again.');
      }
    } catch (error) {
      console.error("Failed to update lesson progress:", error);
      alert('An error occurred while updating lesson progress. Please try again.');
    }
  };

  // Check if user has access to this product
  const hasAccess = productId ? hasAccessToProduct(productId) : false

  if (userLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading product content...</p>
        </div>
      </div>
    )
  }

  // Access denied - user doesn't have access to this product
  if (!hasAccess && isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Access Restricted</h1>
          <p className="text-slate-600 mb-6">
            You don't have access to this course. Please purchase this course to continue.
          </p>
          <div className="space-y-3">
            <Link href="/course">
              <Button className="w-full">View Available Courses</Button>
            </Link>
            <Link href="/course">
              <Button variant="outline" className="w-full">Back to Course</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Sign In Required</h1>
          <p className="text-slate-600 mb-6">
            Please sign in to access your course content.
          </p>
          <div className="space-y-3">
            <Link href="/auth/signin">
              <Button className="w-full">Sign In</Button>
            </Link>
            <Link href="/course">
              <Button variant="outline" className="w-full">View Courses</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (error || !productData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h1>
          <p className="text-slate-600 mb-6">{error || 'The requested product could not be found.'}</p>
          <Link href="/course">
            <Button>Back to Course</Button>
          </Link>
        </div>
      </div>
    )
  }

  const totalLessons = productData.lessons.length
  const completedLessons = productId && user ? Object.keys(user.progress || {})
    .filter(key => key.startsWith(`${productId}_lesson_`) && user.progress[key] === 100)
    .length : 0

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Link href="/course">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  {productData.name}
                </h1>
                <p className="text-lg text-slate-600 mb-4">{productData.description}</p>
                <div className="flex items-center space-x-4 text-sm text-slate-500">
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {totalLessons} lessons
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {productData.lessons.reduce((total, lesson) => total + (lesson.duration || 0), 0)} minutes
                  </div>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-800">
                Course {productData.sort_order}
              </Badge>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Progress</span>
                <span className="font-medium text-slate-900">{completedLessons}/{totalLessons} lessons</span>
              </div>
              <Progress value={(completedLessons / totalLessons) * 100} className="h-2" />
            </div>
          </div>
        </div>

        
        {/* Interactive Lesson Cards */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Interactive Lessons</h3>
          <div className="grid gap-6">
            {productData.lessons.map((lesson, index) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                index={index}
                productId={productId!}
                user={user}
                onLessonComplete={handleLessonComplete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
