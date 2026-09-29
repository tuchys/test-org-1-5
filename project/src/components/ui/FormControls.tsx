'use client'

import React from 'react'

// ── Shared FormField wrapper ─────────────────────────────────────────────────

interface FormFieldProps {
  label?: string
  error?: string
  required?: boolean
  children: React.ReactNode
  htmlFor?: string
}

function FormField({ label, error, required, children, htmlFor }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && (
            <span className="ml-0.5 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {error && (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// ── Shared input class helper ────────────────────────────────────────────────

function inputClasses(error?: string, extra?: string) {
  return [
    'w-full px-3 py-2 text-sm',
    'border rounded-md bg-white text-gray-900 placeholder-gray-400',
    error
      ? 'border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:ring-blue-500',
    'focus:outline-none focus:ring-2 focus:border-transparent',
    'disabled:bg-gray-100 disabled:cursor-not-allowed',
    'transition-colors',
    extra,
  ]
    .filter(Boolean)
    .join(' ')
}

// ── TextInput ────────────────────────────────────────────────────────────────

interface TextInputProps {
  label?: string
  name?: string
  id?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  required?: boolean
  disabled?: boolean
  type?: 'text' | 'email' | 'password' | 'tel' | 'url'
  className?: string
}

export function TextInput({
  label,
  name,
  id,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  type = 'text',
  className = '',
}: TextInputProps) {
  const fieldId = id ?? name
  return (
    <FormField label={label} error={error} required={required} htmlFor={fieldId}>
      <input
        id={fieldId}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-invalid={!!error}
        className={[inputClasses(error), className].filter(Boolean).join(' ')}
      />
    </FormField>
  )
}

// ── NumberInput ──────────────────────────────────────────────────────────────

interface NumberInputProps {
  label?: string
  name?: string
  id?: string
  value: string | number
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  required?: boolean
  disabled?: boolean
  min?: number | string
  max?: number | string
  step?: number | string
  className?: string
}

export function NumberInput({
  label,
  name,
  id,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  min,
  max,
  step,
  className = '',
}: NumberInputProps) {
  const fieldId = id ?? name
  return (
    <FormField label={label} error={error} required={required} htmlFor={fieldId}>
      <input
        id={fieldId}
        name={name}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        aria-invalid={!!error}
        className={[inputClasses(error), className].filter(Boolean).join(' ')}
      />
    </FormField>
  )
}

// ── SelectInput ──────────────────────────────────────────────────────────────

export interface SelectOption {
  value: string
  label: string
}

interface SelectInputProps {
  label?: string
  name?: string
  id?: string
  value: string
  onChange: (value: string) => void
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
  id,
  value,
  onChange,
  options,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = '',
}: SelectInputProps) {
  const fieldId = id ?? name
  return (
    <FormField label={label} error={error} required={required} htmlFor={fieldId}>
      <div className="relative">
        <select
          id={fieldId}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          className={[
            inputClasses(error, 'appearance-none pr-8'),
            className,
          ]
            .filter(Boolean)
            .join(' ')}
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
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
    </FormField>
  )
}

// ── TextareaInput ────────────────────────────────────────────────────────────

interface TextareaInputProps {
  label?: string
  name?: string
  id?: string
  value: string
  onChange: (value: string) => void
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
  id,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  rows = 4,
  className = '',
}: TextareaInputProps) {
  const fieldId = id ?? name
  return (
    <FormField label={label} error={error} required={required} htmlFor={fieldId}>
      <textarea
        id={fieldId}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        aria-invalid={!!error}
        className={[
          inputClasses(error, 'resize-y min-h-[80px]'),
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    </FormField>
  )
}
