'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Lock, CheckCircle, Star, Award, Download, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ProductWithLessons } from '@/types'

interface CourseCardProps {
  product: ProductWithLessons
  user: any
  onPurchase?: (productId: string) => void
}

export default function CourseCard({ product, user, onPurchase }: CourseCardProps) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isOwned = user?.purchased_product_ids?.includes(product.id);

  // Calculate progress based on completed lessons
  const totalLessons = product.lessons.length;
  const completedLessons = user?.progress?.filter((p: any) => 
    product.lessons.some(lesson => lesson.id === p.lessonId && p.completed)
  ).length || 0;
  const courseProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  const isCompleted = courseProgress === 100;

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
    <Card className={`border-2 transition-all duration-300 hover:shadow-xl ${
      isOwned ? 'border-green-200 bg-green-50' : 'border-slate-200'
    } ${isCompleted ? 'bg-gradient-to-br from-green-50 to-blue-50' : ''}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
              isCompleted ? 'bg-green-600' : isOwned ? 'bg-blue-600' : 'bg-slate-400'
            }`}>
              {isCompleted ? <CheckCircle className="w-5 h-5" /> : product.sort_order}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-slate-900">
                {product.name}
              </CardTitle>
              <p className="text-sm text-slate-600">{product.description}</p>
            </div>
          </div>

          <Badge variant="outline" className="text-slate-700">${product.price} AUD</Badge>
        </div>

        {isOwned && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Progress</span>
              <span className="font-medium text-slate-900">{Math.round(courseProgress)}%</span>
            </div>
            <Progress value={courseProgress} className="h-2" />
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <ul className="space-y-2 mb-6">
          {lessonTitles.map((title, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm">
              {isOwned ? (
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              ) : (
                <Lock className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
              )}
              <span className={isOwned ? 'text-slate-700' : 'text-slate-500'}>{title}</span>
            </li>
          ))}
        </ul>

        <div className="space-y-3">
          {!isOwned ? (
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => handlePurchase(product.id)}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                `Buy ${product.name} - $${product.price} AUD`
              )}
            </Button>
          ) : isCompleted ? (
             <>
              <div className="flex items-center justify-center space-x-2 text-green-700 bg-green-100 rounded-lg p-3 text-sm font-medium">
                <CheckCircle className="w-5 h-5" />
                <span>Course Completed!</span>
              </div>

              <Link href={`/week?product=${product.id}`} className="w-full">
                  <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                      Review Course Content
                      <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
              </Link>
            </>
          ) : (
            <Link href={`/week?product=${product.id}`} className="w-full">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                    Start {product.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
