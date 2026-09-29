'use client'

import React, { useState } from 'react'
import { LoadingState } from './LoadingState'
import { EmptyState } from './EmptyState'
import { Pagination } from './Pagination'

export type SortDirection = 'asc' | 'desc'

export interface DataTableColumn<T> {
  key: string
  header: string
  render?: (row: T, index: number) => React.ReactNode
  sortable?: boolean
  className?: string
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  data: T[]
  totalCount: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
  onSort?: (key: string, direction: SortDirection) => void
  sortKey?: string
  sortDirection?: SortDirection
  isLoading?: boolean
  emptyMessage?: string
  emptyDescription?: string
  keyExtractor?: (row: T, index: number) => string | number
  pageSizeOptions?: number[]
  onPageSizeChange?: (size: number) => void
  className?: string
}

function SortIcon({ active, direction }: { active: boolean; direction: SortDirection }) {
  return (
    <span
      className={['ml-1 inline-flex flex-col leading-none', active ? 'text-blue-600' : 'text-gray-300'].join(' ')}
      aria-hidden="true"
    >
      <span className={active && direction === 'asc' ? 'text-blue-600' : ''}>▲</span>
      <span className={active && direction === 'desc' ? 'text-blue-600' : ''}>▼</span>
    </span>
  )
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  totalCount,
  page,
  pageSize,
  onPageChange,
  onSort,
  sortKey: externalSortKey,
  sortDirection: externalSortDirection,
  isLoading = false,
  emptyMessage = 'No results found',
  emptyDescription,
  keyExtractor,
  pageSizeOptions,
  onPageSizeChange,
  className = '',
}: DataTableProps<T>) {
  // Internal sort state (used when no external sort props are provided)
  const [internalSortKey, setInternalSortKey] = useState<string>('')
  const [internalSortDirection, setInternalSortDirection] = useState<SortDirection>('asc')

  const activeSortKey = externalSortKey ?? internalSortKey
  const activeSortDirection = externalSortDirection ?? internalSortDirection

  function handleSort(colKey: string) {
    const nextDirection: SortDirection =
      activeSortKey === colKey && activeSortDirection === 'asc' ? 'desc' : 'asc'

    if (onSort) {
      onSort(colKey, nextDirection)
    } else {
      setInternalSortKey(colKey)
      setInternalSortDirection(nextDirection)
    }
  }

  function getCellValue(row: T, col: DataTableColumn<T>, index: number): React.ReactNode {
    if (col.render) return col.render(row, index)
    const val = row[col.key]
    if (val === null || val === undefined) return '—'
    return String(val)
  }

  // If sorting is handled internally (no onSort prop), sort the data here
  let displayData = data
  if (!onSort && internalSortKey) {
    displayData = [...data].sort((a, b) => {
      const av = a[internalSortKey]
      const bv = b[internalSortKey]
      if (av === bv) return 0
      const cmp = String(av) < String(bv) ? -1 : 1
      return internalSortDirection === 'asc' ? cmp : -cmp
    })
  }

  return (
    <div className={['flex flex-col gap-4', className].filter(Boolean).join(' ')}>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  className={[
                    'px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap',
                    col.sortable
                      ? 'cursor-pointer select-none hover:bg-gray-100 transition-colors'
                      : '',
                    col.className ?? '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-sort={
                    col.sortable && activeSortKey === col.key
                      ? activeSortDirection === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  }
                >
                  <span className="inline-flex items-center">
                    {col.header}
                    {col.sortable && (
                      <SortIcon
                        active={activeSortKey === col.key}
                        direction={activeSortDirection}
                      />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="py-12">
                  <LoadingState message="Loading data…" size="md" />
                </td>
              </tr>
            ) : displayData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-4">
                  <EmptyState
                    title={emptyMessage}
                    description={emptyDescription}
                  />
                </td>
              </tr>
            ) : (
              displayData.map((row, rowIndex) => (
                <tr
                  key={
                    keyExtractor
                      ? keyExtractor(row, rowIndex)
                      : rowIndex
                  }
                  className="hover:bg-gray-50 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={[
                        'px-4 py-3 text-gray-900 whitespace-nowrap',
                        col.className ?? '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {getCellValue(row, col, rowIndex)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!isLoading && totalCount > 0 && (
        <Pagination
          page={page}
          pageSize={pageSize}
          totalCount={totalCount}
          onPageChange={onPageChange}
          pageSizeOptions={pageSizeOptions}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  )
}
