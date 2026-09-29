'use client'

import React from 'react'

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  isLoading?: boolean
  className?: string
}

function TrendUp() {
  return (
    <svg
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  )
}

function TrendDown() {
  return (
    <svg
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  )
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  isLoading = false,
  className = '',
}: MetricCardProps) {
  const isPositive = change !== undefined && change >= 0

  if (isLoading) {
    return (
      <div
        className={[
          'rounded-lg border border-gray-200 bg-white p-6 shadow-sm animate-pulse',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-8 w-32 bg-gray-200 rounded" />
            <div className="h-3 w-20 bg-gray-200 rounded" />
          </div>
          <div className="h-10 w-10 bg-gray-200 rounded-full ml-4" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={[
        'rounded-lg border border-gray-200 bg-white p-6 shadow-sm',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
          <p className="mt-1 text-3xl font-bold text-gray-900 tracking-tight">
            {value}
          </p>

          {change !== undefined && (
            <div
              className={[
                'mt-2 inline-flex items-center gap-1 text-sm font-medium',
                isPositive ? 'text-green-600' : 'text-red-600',
              ].join(' ')}
            >
              {isPositive ? <TrendUp /> : <TrendDown />}
              <span>
                {isPositive ? '+' : ''}
                {change.toFixed(1)}%
              </span>
              {changeLabel && (
                <span className="ml-1 font-normal text-gray-500">{changeLabel}</span>
              )}
            </div>
          )}
        </div>

        {icon && (
          <div className="ml-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
