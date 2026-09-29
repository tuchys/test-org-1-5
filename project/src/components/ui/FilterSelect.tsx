'use client'

import React, { useState, useRef, useEffect } from 'react'

export interface SelectOption {
  value: string
  label: string
}

// ── Single FilterSelect ──────────────────────────────────────────────────────

interface FilterSelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  className?: string
  disabled?: boolean
}

export function FilterSelect({
  options,
  value,
  onChange,
  placeholder = 'All',
  label,
  className = '',
  disabled = false,
}: FilterSelectProps) {
  return (
    <div className={['flex flex-col gap-1', className].filter(Boolean).join(' ')}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={[
            'w-full appearance-none pl-3 pr-8 py-2 text-sm',
            'border border-gray-300 rounded-md bg-white text-gray-900',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            'transition-colors',
          ].join(' ')}
        >
          {placeholder && (
            <option value="">{placeholder}</option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Chevron icon */}
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
    </div>
  )
}

// ── Multi FilterSelect ───────────────────────────────────────────────────────

interface MultiFilterSelectProps {
  options: SelectOption[]
  values: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  label?: string
  className?: string
  disabled?: boolean
}

export function MultiFilterSelect({
  options,
  values,
  onChange,
  placeholder = 'Select options…',
  label,
  className = '',
  disabled = false,
}: MultiFilterSelectProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  function toggle(optValue: string) {
    if (values.includes(optValue)) {
      onChange(values.filter((v) => v !== optValue))
    } else {
      onChange([...values, optValue])
    }
  }

  const displayLabel =
    values.length === 0
      ? placeholder
      : values.length === 1
      ? options.find((o) => o.value === values[0])?.label ?? values[0]
      : `${values.length} selected`

  return (
    <div
      ref={containerRef}
      className={['relative flex flex-col gap-1', className].filter(Boolean).join(' ')}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={[
          'w-full flex items-center justify-between pl-3 pr-2 py-2 text-sm text-left',
          'border border-gray-300 rounded-md bg-white',
          values.length > 0 ? 'text-gray-900' : 'text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'disabled:bg-gray-100 disabled:cursor-not-allowed',
          'transition-colors',
        ].join(' ')}
      >
        <span className="truncate">{displayLabel}</span>
        <svg
          className={['h-4 w-4 text-gray-400 transition-transform', open ? 'rotate-180' : ''].join(' ')}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-multiselectable="true"
          className={[
            'absolute z-50 top-full left-0 mt-1 w-full',
            'bg-white border border-gray-200 rounded-md shadow-lg',
            'max-h-48 overflow-y-auto',
          ].join(' ')}
        >
          {options.map((opt) => {
            const checked = values.includes(opt.value)
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={checked}
                onClick={() => toggle(opt.value)}
                className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 select-none"
              >
                <input
                  type="checkbox"
                  readOnly
                  checked={checked}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  tabIndex={-1}
                />
                <span className="text-gray-900">{opt.label}</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
