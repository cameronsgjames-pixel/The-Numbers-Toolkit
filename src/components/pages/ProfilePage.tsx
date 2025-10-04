'use client'

import React, { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Download, 
  LogOut, 
  CheckCircle
} from 'lucide-react'
import { UserWithProgress, ProductWithLessons } from '@/types'
import Link from 'next/link'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [user, setUser] = useState<UserWithProgress | null>(null)
  const [products, setProducts] = useState<ProductWithLessons[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session?.user) {
      router.push('/course')
      return
    }
    
    loadData()
  }, [session, status, router])

  const loadData = async () => {
    await Promise.all([loadUser(), loadProducts()])
  }

  const loadUser = async () => {
    if (!session?.user?.email) return
    
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      }
    } catch (error) {
      console.error("Error loading user:", error)
    }
  }

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const productsData = await response.json()
        setProducts(productsData)
      }
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const getProductName = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      return product.name
    }
    if (productId === 'prod_bundle') {
      return 'Complete Bundle'
    }
    if (productId.startsWith('prod_week_')) {
      return `Course ${productId.replace('prod_week_', '')}`
    }
    return productId
  }

  const calculateOverallProgress = () => {
    if (!user?.progress) return 0
    
    // Handle both array and object formats
    let progressArray: any[] = []
    if (Array.isArray(user.progress)) {
      progressArray = user.progress
    } else if (typeof user.progress === 'object') {
      // If progress is an object, convert to array of values
      progressArray = Object.values(user.progress)
    }
    
    if (progressArray.length === 0) return 0
    
    const totalLessons = progressArray.length
    const completedLessons = progressArray.filter((p: any) => p.completed).length
    return Math.round((completedLessons / totalLessons) * 100)
  }

  const getTotalTimeSpent = () => {
    if (!user?.progress) return 0
    
    // Handle both array and object formats
    let progressArray: any[] = []
    if (Array.isArray(user.progress)) {
      progressArray = user.progress
    } else if (typeof user.progress === 'object') {
      // If progress is an object, convert to array of values
      progressArray = Object.values(user.progress)
    }
    
    return progressArray.reduce((total: number, p: any) => total + (p.time_spent || 0), 0)
  }

  const formatTimeSpent = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-6">Please sign in to view your profile.</p>
          <Button onClick={() => router.push('/course')}>
            Go to Member Portal
          </Button>
        </div>
      </div>
    )
  }

  const overallProgress = calculateOverallProgress()
  const totalTimeSpent = getTotalTimeSpent()
  const purchasedCourses = user.purchased_product_ids?.length || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Header */}
        <div className="mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {user.name || 'Profile'}
                  </p>
                  <p className="text-xs text-slate-600">{user.email}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="bg-white/80 hover:bg-white border-slate-200"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xl font-bold text-slate-900">{overallProgress}%</p>
                <p className="text-xs text-slate-600">Progress</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xl font-bold text-slate-900">{purchasedCourses}</p>
                <p className="text-xs text-slate-600">Courses</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Purchased Courses */}
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                {user.purchased_product_ids && user.purchased_product_ids.length > 0 ? (
                  <div className="space-y-3">
                    {user.purchased_product_ids.map((productId: string) => (
                      <div key={productId} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-900 text-sm">
                              {getProductName(productId)}
                            </h4>
                          </div>
                        </div>
                        <Link href="/course">
                          <Button variant="outline" size="sm" className="text-xs">
                            View
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                    <p className="text-sm text-slate-600 mb-4">Start your learning journey by purchasing a course.</p>
                    <Link href="/course">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Browse Courses
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6 space-y-2">
                <Link href="/course" className="block">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    My Courses
                  </Button>
                </Link>
                <Link href="/downloads" className="block">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Downloads
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
