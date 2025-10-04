'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react'

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Card className="shadow-lg">
          <CardContent className="p-8 sm:p-12">
            {/* Cancel Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <XCircle className="w-10 h-10 text-orange-600" />
              </div>
            </div>
            
            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Payment Cancelled
            </h1>
            
            {/* Subtext */}
            <p className="text-lg text-muted-foreground mb-8">
              Your payment was cancelled. You can try again anytime when you're ready.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/choose-course">
                <Button 
                  size="lg" 
                  className="px-8 py-3 text-lg font-semibold"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Try Again
                </Button>
              </Link>
              
              <Link href="/">
                <Button 
                  variant="outline"
                  size="lg" 
                  className="px-8 py-3 text-lg font-semibold"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>

            {/* Additional info */}
            <div className="mt-8 text-sm text-muted-foreground">
              <p>Need help? Contact our support team for assistance.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
