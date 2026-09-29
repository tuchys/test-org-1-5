'use client'

import React from 'react'

type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'neutral'
type BadgeSize = 'sm' | 'md'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-green-100 text-green-800',
  error: 'bg-red-100 text-red-800',
  warning: 'bg-yellow-100 text-yellow-800',
  info: 'bg-blue-100 text-blue-800',
  neutral: 'bg-gray-100 text-gray-800',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

export function Badge({
  label,
  variant = 'neutral',
  size = 'sm',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {label}
    </span>
  )
}
