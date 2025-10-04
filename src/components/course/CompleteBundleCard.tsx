'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Lock, CheckCircle, ArrowRight, Loader2, Crown } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ProductWithLessons } from '@/types'

interface CompleteBundleCardProps {
  product: ProductWithLessons
  user: any
  onPurchase?: (productId: string) => void
  allProducts: ProductWithLessons[]
}

export default function CompleteBundleCard({ product, user, onPurchase, allProducts }: CompleteBundleCardProps) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isOwned = user?.purchased_product_ids?.includes(product.id);

  // Simple ownership check - no progress tracking
  const individualProducts = allProducts.filter(p => !p.key?.includes('complete_bundle'));
  const isCompleted = false; // Remove completion tracking

  // Calculate savings
  const individualTotal = individualProducts.reduce((sum, p) => sum + p.price, 0);
  const savings = individualTotal - product.price;

  const handlePurchase = async (productId: string) => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          successUrl: `${window.location.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/payment-cancel`,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create checkout session');
      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`border-2 ${
      isOwned 
        ? 'border-purple-300 bg-purple-50' 
        : 'border-purple-200 bg-white'
    }`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isOwned 
                ? 'bg-purple-500' 
                : 'bg-orange-500'
            }`}>
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">{product.name}</CardTitle>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">${product.price} AUD</div>
            {!isOwned && savings > 0 && (
              <Badge className="bg-green-500 text-white">
                Save ${savings}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">

        {/* Courses List */}
        <div>
          <h4 className="font-medium mb-2">Included Courses</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {individualProducts.map((course) => (
              <div key={course.id} className="flex items-center space-x-2 p-2 rounded bg-gray-50">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  isOwned ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  {isOwned ? (
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  ) : (
                    <Lock className="w-3 h-3 text-gray-400" />
                  )}
                </div>
                <span className="text-sm">{course.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {!isOwned ? (
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={() => handlePurchase(product.id)}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                `Purchase Bundle - $${product.price} AUD`
              )}
            </Button>
          ) : (
            <Link href={`/week?product=${product.id}`}>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Access Bundle
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
