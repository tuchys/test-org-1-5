'use client'

import React from 'react'
import { cn } from '@/lib/cn'

// ─── Shared styles ─────────────────────────────────────────────────────────────

const baseInputClass =
  'block w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 ' +
  'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors ' +
  'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed'

const normalBorder = 'border-gray-300 bg-white'
const errorBorder = 'border-red-500 bg-white focus:ring-red-400 focus:border-red-500'

// ─── TextInput ────────────────────────────────────────────────────────────────

interface TextInputProps {
  label?: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  error?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

export function TextInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required,
  disabled,
  className,
}: TextInputProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={cn(baseInputClass, error ? errorBorder : normalBorder)}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  )
}

// ─── NumberInput ──────────────────────────────────────────────────────────────

interface NumberInputProps {
  label?: string
  name: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  error?: string
  required?: boolean
  disabled?: boolean
  min?: number
  max?: number
  step?: number
  className?: string
}

export function NumberInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required,
  disabled,
  min,
  max,
  step,
  className,
}: NumberInputProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className={cn(baseInputClass, error ? errorBorder : normalBorder)}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  )
}

// ─── SelectInput ──────────────────────────────────────────────────────────────

interface SelectOption {
  value: string
  label: string
}

interface SelectInputProps {
  label?: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: SelectOption[]
  placeholder?: string
  error?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

export function SelectInput({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  error,
  required,
  disabled,
  className,
}: SelectInputProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={cn(
            baseInputClass,
            'pr-8 appearance-none cursor-pointer',
            error ? errorBorder : normalBorder
          )}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            className="h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  )
}

// ─── TextareaInput ────────────────────────────────────────────────────────────

interface TextareaInputProps {
  label?: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  error?: string
  required?: boolean
  disabled?: boolean
  rows?: number
  className?: string
}

export function TextareaInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required,
  disabled,
  rows = 3,
  className,
}: TextareaInputProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={cn(
          baseInputClass,
          'resize-y',
          error ? errorBorder : normalBorder
        )}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  )
}
