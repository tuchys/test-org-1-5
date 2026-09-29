'use client'

import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  icon?: React.ReactNode
  children?: React.ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white border border-transparent focus:ring-blue-500',
  secondary:
    'bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 border border-gray-300 focus:ring-gray-400',
  danger:
    'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white border border-transparent focus:ring-red-500',
  ghost:
    'bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-600 border border-transparent focus:ring-gray-400',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
  md: 'px-4 py-2 text-sm rounded-md gap-2',
  lg: 'px-5 py-2.5 text-base rounded-lg gap-2',
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  icon,
  children,
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || isLoading

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
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
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      {children && <span>{children}</span>}
    </button>
  )
}
