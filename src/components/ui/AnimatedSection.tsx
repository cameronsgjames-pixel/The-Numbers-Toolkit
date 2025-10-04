'use client'

import React from 'react'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
}

export default function AnimatedSection({ children, className = '' }: AnimatedSectionProps) {
  return (
    <div className={`transition-all duration-300 ${className}`}>
      {children}
    </div>
  )
}
