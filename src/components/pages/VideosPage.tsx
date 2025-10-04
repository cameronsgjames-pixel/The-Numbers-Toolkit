'use client'

import React from 'react'

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Video Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access your course videos and learning materials.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Course Videos
          </h2>
          <p className="text-gray-600 mb-6">
            This page is currently under development. Please check back soon for video access.
          </p>
        </div>
      </div>
    </div>
  )
}
