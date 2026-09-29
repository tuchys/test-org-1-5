'use client'

import React, { useState, useEffect, useRef } from 'react'

interface SearchInputProps {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  debounceMs?: number
  className?: string
}

export function SearchInput({
  value: externalValue = '',
  onChange,
  placeholder = 'Search…',
  debounceMs = 300,
  className = '',
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(externalValue)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sync when parent changes external value
  useEffect(() => {
    setInputValue(externalValue)
  }, [externalValue])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value
    setInputValue(next)

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      onChange(next)
    }, debounceMs)
  }

  function handleClear() {
    setInputValue('')
    if (timerRef.current) clearTimeout(timerRef.current)
    onChange('')
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div className={['relative flex items-center', className].filter(Boolean).join(' ')}>
      {/* Search icon */}
      <span className="absolute left-3 text-gray-400 pointer-events-none">
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
      </span>

      <input
        type="search"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={[
          'w-full pl-9 pr-8 py-2 text-sm',
          'border border-gray-300 rounded-md',
          'bg-white text-gray-900 placeholder-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'transition-colors',
        ].join(' ')}
      />

      {/* Clear button */}
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
