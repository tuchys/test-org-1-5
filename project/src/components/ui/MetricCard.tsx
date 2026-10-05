'use client'

import { cn } from '@/lib/cn'
import { LoadingSkeleton } from './LoadingSpinner'

// ─── MetricCard ───────────────────────────────────────────────────────────────

interface Trend {
  value: number
  isPositive: boolean
}

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  trend?: Trend
  className?: string
  isLoading?: boolean
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  className,
  isLoading = false,
}: MetricCardProps) {
  if (isLoading) {
    return (
      <div className={cn('bg-white rounded-xl shadow-sm border border-gray-100 p-5', className)}>
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <LoadingSkeleton className="h-4 w-24" />
            <LoadingSkeleton className="h-8 w-32" />
            <LoadingSkeleton className="h-3 w-20" />
          </div>
          <LoadingSkeleton className="h-10 w-10 rounded-lg flex-shrink-0" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-sm border border-gray-100 p-5',
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Text content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 truncate">{value}</p>
          {(subtitle || trend) && (
            <div className="mt-1.5 flex items-center gap-2">
              {trend && (
                <span
                  className={cn(
                    'inline-flex items-center gap-0.5 text-xs font-medium rounded-full px-1.5 py-0.5',
                    trend.isPositive
                      ? 'text-green-700 bg-green-100'
                      : 'text-red-700 bg-red-100'
                  )}
                >
                  {trend.isPositive ? (
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                  {Math.abs(trend.value)}%
                </span>
              )}
              {subtitle && (
                <p className="text-xs text-gray-500 truncate">{subtitle}</p>
              )}
            </div>
          )}
        </div>

        {/* Icon */}
        {icon && (
          <div className="flex-shrink-0 p-2.5 bg-brand-50 rounded-lg text-brand-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Generic Card ─────────────────────────────────────────────────────────────

interface CardProps {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export function Card({ children, header, footer, className }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-sm border border-gray-100',
        className
      )}
    >
      {header && (
        <div className="px-5 py-4 border-b border-gray-100">{header}</div>
      )}
      <div className="px-5 py-4">{children}</div>
      {footer && (
        <div className="px-5 py-4 border-t border-gray-100">{footer}</div>
      )}
    </div>
  )
}
