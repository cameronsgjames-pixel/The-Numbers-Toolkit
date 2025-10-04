'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, ArrowRight, Loader2, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ProductWithLessons } from '@/types'

export default function ChooseCoursePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [products, setProducts] = useState<ProductWithLessons[]>([])
  const [loading, setLoading] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    loadProducts()
    if (session?.user?.email) {
      loadUser()
    }
  }, [session])

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products?include_lessons=true')
      if (response.ok) {
        const productsData = await response.json()
        setProducts(productsData)
      }
    } catch (error) {
      console.error('Error loading products:', error)
    }
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

  const handlePurchase = async (productId: string) => {
    if (status === 'loading') {
      return
    }

    if (!session) {
      router.push('/auth/signin')
      return
    }

    setLoading(productId)

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          successUrl: `${window.location.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/payment-cancel`,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      window.location.href = data.url
    } catch (error) {
      console.error('Error creating checkout session:', error)
      alert('Failed to process payment. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Course
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the individual course that best fits your learning needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.filter(p => p.key !== 'complete_bundle').map((product, index) => {
            const isOwned = user?.purchased_product_ids?.includes(product.id);
            return (
              <Card key={product.id} className={`group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                isOwned 
                  ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200' 
                  : 'bg-white border-2 border-slate-200 hover:border-blue-300'
              }`}>
                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge className={`px-3 py-1 text-xs font-semibold ${
                    isOwned 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-slate-500 text-white'
                  }`}>
                    {isOwned ? 'Owned' : 'Available'}
                  </Badge>
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-slate-700 border-slate-300 px-3 py-1 text-sm font-bold">
                    ${product.price} AUD
                  </Badge>
                </div>

                <CardHeader className="pt-12 pb-4">
                  <div className="space-y-3">
                    {/* Course Icon and Title Row */}
                    <div className="flex items-start space-x-3">
                      <div className="relative flex-shrink-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${
                          isOwned 
                            ? 'bg-gradient-to-br from-blue-500 to-indigo-600' 
                            : index === 0 
                              ? 'bg-gradient-to-br from-orange-500 to-orange-600'
                              : 'bg-gradient-to-br from-slate-400 to-slate-500'
                        }`}>
                          <span className="text-lg font-bold text-white">{product.sort_order}</span>
                        </div>
                        {isOwned && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                            <Star className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg font-bold text-slate-900 leading-tight mb-1">
                          {product.name}
                        </CardTitle>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 pb-4">
                  {/* Lessons List */}
                  <div className="space-y-2 mb-4">
                    <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Course Content</h4>
                    <div className="space-y-1">
                      {product.lessons && product.lessons.length > 0 ? (
                        product.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="flex items-center space-x-2 p-1.5 rounded-md bg-white/50">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                              isOwned ? 'bg-green-100' : 'bg-slate-100'
                            }`}>
                              {isOwned ? (
                                <Check className="w-3 h-3 text-green-600" />
                              ) : (
                                <Check className="w-3 h-3 text-slate-400" />
                              )}
                            </div>
                            <span className={`text-xs ${
                              isOwned ? 'text-slate-700 font-medium' : 'text-slate-500'
                            }`}>
                              {lesson.title}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center space-x-2 p-1.5 rounded-md bg-white/50">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isOwned ? 'bg-green-100' : 'bg-slate-100'
                          }`}>
                            <Check className="w-3 h-3 text-slate-400" />
                          </div>
                          <span className="text-xs text-slate-500">
                            Interactive lessons and exercises
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="space-y-2">
                    {!isOwned ? (
                      <Button
                        className={`w-full bg-gradient-to-r text-white py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 ${
                          index === 0 
                            ? 'from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800'
                            : 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                        }`}
                        onClick={() => handlePurchase(product.id)}
                        disabled={loading === product.id}
                      >
                        {loading === product.id ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Star className="w-4 h-4 mr-2" />
                            Get Access - ${product.price} AUD
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300">
                        Access Course
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bundle Section - Full Width at Bottom - Only show if user doesn't have all courses */}
        {products.find(p => p.key === 'complete_bundle') && 
         (!user?.purchased_product_ids || 
          user.purchased_product_ids.length < products.filter(p => p.key !== 'complete_bundle').length) && (
          <div className="mt-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                Get Complete Access
              </h3>
              <p className="text-xl text-slate-600">
                Save $45 and get lifetime access to all courses
              </p>
            </div>
            
            <Card className="group relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border-2 border-purple-200 bg-white max-w-4xl mx-auto">
              {/* Status Badge */}
              <div className="absolute top-6 right-6 z-10">
                <Badge className="px-4 py-2 text-sm font-semibold bg-purple-500 text-white">
                  <Star className="w-4 h-4 mr-2" />
                  Best Value
                </Badge>
              </div>

              {/* Price Badge */}
              <div className="absolute top-6 left-6 z-10">
                <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-slate-700 border-slate-300 px-4 py-2 text-lg font-bold">
                  ${products.find(p => p.key === 'complete_bundle')?.price} AUD
                </Badge>
              </div>

              <CardHeader className="pt-16 pb-6 text-center">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-purple-500 to-indigo-600">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-slate-900 mb-4">
                  Complete Excel Mastery Bundle
                </CardTitle>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Get access to all 6 courses: Foundations, Formulas, Functions, Data Analysis, Business Modelling, and Presenting with Impact. Save $45 compared to buying individually!
                </p>
              </CardHeader>

              <CardContent className="px-8 pb-6">
                <div className="flex items-center justify-center space-x-6 mb-8">
                  <span className="text-6xl font-bold text-slate-900">${products.find(p => p.key === 'complete_bundle')?.price}</span>
                  <div className="text-center">
                    <span className="text-2xl font-medium text-slate-400 line-through block">$174</span>
                    <span className="text-slate-500">AUD</span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-4 text-lg">What's Included:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-slate-700 font-medium">All 6 Individual Courses</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-slate-700 font-medium">24+ Professional Lessons</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-slate-700 font-medium">Practice Workbooks & Templates</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-4 text-lg">Benefits:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-slate-700 font-medium">Save $45 vs Individual Purchase</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-slate-700 font-medium">Lifetime Access</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-slate-700 font-medium">Complete Learning Path</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="px-8 pb-8">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xl py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => handlePurchase(products.find(p => p.key === 'complete_bundle')!.id)}
                  disabled={loading === products.find(p => p.key === 'complete_bundle')?.id}
                >
                  {loading === products.find(p => p.key === 'complete_bundle')?.id ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Star className="w-5 h-5 mr-2" />
                      Get Complete Bundle - ${products.find(p => p.key === 'complete_bundle')?.price} AUD
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
