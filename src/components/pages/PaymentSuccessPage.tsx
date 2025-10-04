'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Card className="shadow-lg">
          <CardContent className="p-8 sm:p-12">
            {/* Success Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
            
            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Payment Successful
            </h1>
            
            {/* Subtext */}
            <p className="text-lg text-muted-foreground mb-8">
              Your payment has been processed successfully. You now have access to your course.
            </p>
            
            {/* Action Button */}
            <Link href="/course">
              <Button 
                size="lg" 
                className="px-8 py-3 text-lg font-semibold"
              >
                Begin your learning journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            {/* Success indicators */}
            <div className="mt-8 flex justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                Instant Access
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                Lifetime Access
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                Mobile Friendly
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
