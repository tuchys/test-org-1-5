'use client'

import React from 'react'

type SpinnerSize = 'sm' | 'md' | 'lg'

interface LoadingStateProps {
  message?: string
  size?: SpinnerSize
  className?: string
  fullPage?: boolean
}

const spinnerSizes: Record<SpinnerSize, number> = {
  sm: 16,
  md: 32,
  lg: 48,
}

export function LoadingState({
  message = 'Loading...',
  size = 'md',
  className = '',
  fullPage = false,
}: LoadingStateProps) {
  const px = spinnerSizes[size]

  const inner = (
    <div
      className={[
        'flex flex-col items-center justify-center gap-3',
        fullPage ? '' : className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <svg
        style={{ width: px, height: px }}
        className="animate-spin text-blue-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-label="Loading"
        role="status"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      {message && (
        <p className="text-sm text-gray-500">{message}</p>
      )}
    </div>
  )

  if (fullPage) {
    return (
      <div
        className={[
          'fixed inset-0 flex items-center justify-center bg-white/80 z-40',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {inner}
      </div>
    )
  }

  return inner
}

// ── Skeleton loader ─────────────────────────────────────────────────────────

interface SkeletonLoaderProps {
  lines?: number
  className?: string
}

const LINE_WIDTHS = ['w-full', 'w-5/6', 'w-4/6', 'w-3/4', 'w-2/3', 'w-1/2']

export function SkeletonLoader({ lines = 3, className = '' }: SkeletonLoaderProps) {
  return (
    <div className={['animate-pulse space-y-3', className].filter(Boolean).join(' ')}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={[
            'h-4 bg-gray-200 rounded',
            LINE_WIDTHS[i % LINE_WIDTHS.length],
          ].join(' ')}
        />
      ))}
    </div>
  )
}
