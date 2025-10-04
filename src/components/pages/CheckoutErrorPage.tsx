'use client'

import React from 'react'

export default function CheckoutErrorPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Payment Error
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            There was an issue processing your payment. Please try again.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What to do next
          </h2>
          <p className="text-gray-600 mb-6">
            Please contact support if you continue to experience issues with your payment.
          </p>
        </div>
      </div>
    </div>
  )
}
