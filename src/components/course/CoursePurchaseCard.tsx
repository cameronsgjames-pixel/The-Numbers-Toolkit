'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Lock, CheckCircle, Star, Award, Download, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ProductWithLessons } from '@/types'

interface CourseCardProps {
  product: ProductWithLessons
  user: any
  onPurchase?: (productId: string) => void
  isFullWidth?: boolean
}

export default function CourseCard({ product, user, onPurchase, isFullWidth = false }: CourseCardProps) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isOwned = user?.purchased_product_ids?.includes(product.id);

  // Simple ownership check - no progress tracking
  const isCompleted = false; // Remove completion tracking

  // Get lesson titles for display
  const lessonTitles = product.lessons.map(lesson => lesson.title);

  const handlePurchase = async (productId: string) => {
    if (status === 'loading') {
      return; // Still loading session
    }

    if (!session) {
      // Redirect to sign in if not authenticated
      router.push('/auth/signin');
      return;
    }

    setLoading(true);

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
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
      isOwned 
        ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200' 
        : 'bg-white border-2 border-slate-200 hover:border-blue-300'
    } ${isFullWidth ? 'max-w-none' : ''}`}>
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
        <div className={isFullWidth ? "flex items-start space-x-6" : "space-y-3"}>
          {/* Course Icon and Title Row */}
          <div className={`flex items-start space-x-3 ${isFullWidth ? "flex-shrink-0" : ""}`}>
            <div className="relative flex-shrink-0">
              <div className={`${isFullWidth ? "w-16 h-16" : "w-10 h-10"} rounded-xl flex items-center justify-center shadow-md ${
                isOwned 
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600' 
                  : 'bg-gradient-to-br from-slate-400 to-slate-500'
              }`}>
                <span className={`${isFullWidth ? "text-2xl" : "text-lg"} font-bold text-white`}>{product.sort_order}</span>
              </div>
              {isOwned && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <CardTitle className={`${isFullWidth ? "text-2xl" : "text-lg"} font-bold text-slate-900 leading-tight mb-1`}>
                {product.name}
              </CardTitle>
              <p className={`text-slate-600 ${isFullWidth ? "text-base" : "text-xs"} leading-relaxed`}>
                {product.description}
              </p>
            </div>
          </div>

        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-4">
        <div className={isFullWidth ? "flex items-start space-x-6" : ""}>
          {/* Lessons List */}
          <div className={`space-y-2 mb-4 ${isFullWidth ? "flex-1" : ""}`}>
            <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Course Content</h4>
            <div className="space-y-1">
              {lessonTitles.map((title, index) => (
                <div key={index} className="flex items-center space-x-2 p-1.5 rounded-md bg-white/50">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isOwned ? 'bg-green-100' : 'bg-slate-100'
                  }`}>
                    {isOwned ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <Lock className="w-2.5 h-2.5 text-slate-400" />
                    )}
                  </div>
                  <span className={`text-xs ${
                    isOwned ? 'text-slate-700 font-medium' : 'text-slate-500'
                  }`}>
                    {title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className={`space-y-2 ${isFullWidth ? "flex-shrink-0 w-64" : ""}`}>
            {!isOwned ? (
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => handlePurchase(product.id)}
                disabled={loading}
              >
                {loading ? (
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
              <Link href={`/week?product=${product.id}`} className="w-full">
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300">
                  Access Course
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
