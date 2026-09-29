'use client'

import React from 'react'

interface PaginationProps {
  page: number
  pageSize: number
  totalCount: number
  onPageChange: (page: number) => void
  pageSizeOptions?: number[]
  onPageSizeChange?: (size: number) => void
  className?: string
}

function buildPageNumbers(currentPage: number, totalPages: number): (number | '…')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }
  const pages: (number | '…')[] = [1]
  if (currentPage > 3) pages.push('…')
  const start = Math.max(2, currentPage - 1)
  const end = Math.min(totalPages - 1, currentPage + 1)
  for (let i = start; i <= end; i++) pages.push(i)
  if (currentPage < totalPages - 2) pages.push('…')
  pages.push(totalPages)
  return pages
}

export function Pagination({
  page,
  pageSize,
  totalCount,
  onPageChange,
  pageSizeOptions = [10, 25, 50],
  onPageSizeChange,
  className = '',
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
  const firstItem = totalCount === 0 ? 0 : (page - 1) * pageSize + 1
  const lastItem = Math.min(page * pageSize, totalCount)
  const pageNumbers = buildPageNumbers(page, totalPages)

  const btnBase =
    'inline-flex items-center justify-center h-8 min-w-[2rem] px-2 text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500'
  const btnEnabled =
    'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
  const btnDisabled =
    'border border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed'
  const btnActive =
    'border border-blue-600 bg-blue-600 text-white font-medium'

  return (
    <div
      className={[
        'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Info text + optional page size selector */}
      <div className="flex items-center gap-3 text-sm text-gray-600">
        <span>
          {totalCount === 0
            ? 'No results'
            : `Showing ${firstItem}–${lastItem} of ${totalCount}`}
        </span>
        {onPageSizeChange && (
          <label className="flex items-center gap-1">
            <span className="text-gray-500">Per page:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-1.5 py-0.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {pageSizeOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {/* Page buttons */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className={[btnBase, page <= 1 ? btnDisabled : btnEnabled].join(' ')}
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {pageNumbers.map((p, idx) =>
          p === '…' ? (
            <span
              key={`ellipsis-${idx}`}
              className="inline-flex items-center justify-center h-8 px-2 text-sm text-gray-400"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
              className={[btnBase, p === page ? btnActive : btnEnabled].join(' ')}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
          className={[btnBase, page >= totalPages ? btnDisabled : btnEnabled].join(' ')}
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
