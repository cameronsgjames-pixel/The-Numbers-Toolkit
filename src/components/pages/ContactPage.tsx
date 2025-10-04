'use client'

import React from 'react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our support team for any questions about The Numbers Toolkit.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Contact Information
          </h2>
          <p className="text-gray-600 mb-6">
            For support and questions, please reach out to us at support@thenumberstoolkit.com
          </p>
        </div>
      </div>
    </div>
  )
}
