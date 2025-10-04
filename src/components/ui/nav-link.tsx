'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  children: ReactNode
  className?: string
  activeClassName?: string
  inactiveClassName?: string
  exact?: boolean
  onClick?: () => void
}

export default function NavLink({ 
  href, 
  children, 
  className = '',
  activeClassName = 'bg-blue-50 text-blue-700',
  inactiveClassName = 'text-slate-600 hover:text-slate-900 hover:bg-slate-50',
  exact = false,
  onClick
}: NavLinkProps) {
  const pathname = usePathname()
  
  const isActive = exact 
    ? pathname === href 
    : pathname.startsWith(href) || (href !== '/' && pathname === href)
  
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
        isActive ? activeClassName : inactiveClassName,
        className
      )}
    >
      {children}
    </Link>
  )
}
