'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<any>(null)

  const productId = searchParams.get('product')

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/signin?callbackUrl=/checkout?product=' + productId)
      return
    }

    if (!productId) {
      router.push('/')
      return
    }

    // Fetch product details
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products`)
        const products = await response.json()
        const foundProduct = products.find((p: any) => p.id === productId)
        
        if (!foundProduct) {
          router.push('/')
          return
        }
        
        setProduct(foundProduct)
      } catch (error) {
        console.error('Error fetching product:', error)
        router.push('/')
      }
    }

    fetchProduct()
  }, [session, status, productId, router])

  const handlePurchase = async () => {
    if (!product) return

    setLoading(true)

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          successUrl: `${window.location.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/payment-cancel`,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url
    } catch (error) {
      console.error('Error creating checkout session:', error)
      alert('Failed to process payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Complete Your Purchase
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            You're about to unlock {product.name}
          </p>
        </div>
        
        <Card className="bg-white shadow-lg">
          <CardHeader className="p-8">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
              {product.name}
            </CardTitle>
            {product.description && (
              <p className="text-gray-600 mb-6">
                {product.description}
              </p>
            )}
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-gray-600 ml-2">AUD</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">One-time payment</p>
                <p className="text-sm text-gray-500">Lifetime access</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-gray-900">What's included:</h3>
              {product.lessons && product.lessons.length > 0 ? (
                <ul className="space-y-2">
                  {product.lessons.map((lesson: any) => (
                    <li key={lesson.id} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {lesson.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">Complete course content and resources</p>
              )}
            </div>

            <Button 
              size="lg" 
              className="w-full text-lg bg-blue-600 hover:bg-blue-700"
              onClick={handlePurchase}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                `Complete Purchase - $${product.price} AUD`
              )}
            </Button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Secure payment powered by Stripe
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
