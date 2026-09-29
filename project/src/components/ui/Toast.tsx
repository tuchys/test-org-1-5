'use client'

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react'

// ── Types ────────────────────────────────────────────────────────────────────

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastMessage {
  id: string
  message: string
  type: ToastType
  duration: number
}

interface ToastContextValue {
  addToast: (message: string, type?: ToastType, duration?: number) => void
  removeToast: (id: string) => void
}

// ── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return ctx
}

// ── Individual Toast ─────────────────────────────────────────────────────────

const typeStyles: Record<ToastType, { border: string; bg: string; icon: React.ReactNode }> = {
  success: {
    border: 'border-l-green-500',
    bg: 'bg-green-50',
    icon: (
      <svg className="h-5 w-5 text-green-500 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
      </svg>
    ),
  },
  error: {
    border: 'border-l-red-500',
    bg: 'bg-red-50',
    icon: (
      <svg className="h-5 w-5 text-red-500 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
      </svg>
    ),
  },
  warning: {
    border: 'border-l-yellow-500',
    bg: 'bg-yellow-50',
    icon: (
      <svg className="h-5 w-5 text-yellow-500 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  info: {
    border: 'border-l-blue-500',
    bg: 'bg-blue-50',
    icon: (
      <svg className="h-5 w-5 text-blue-500 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
      </svg>
    ),
  },
}

interface ToastItemProps {
  toast: ToastMessage
  onRemove: (id: string) => void
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const [visible, setVisible] = useState(false)
  const styles = typeStyles[toast.type]
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Animate in
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  // Auto-remove
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onRemove(toast.id), 300) // wait for exit animation
    }, toast.duration)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [toast.id, toast.duration, onRemove])

  function handleClose() {
    if (timerRef.current) clearTimeout(timerRef.current)
    setVisible(false)
    setTimeout(() => onRemove(toast.id), 300)
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{
        transition: 'opacity 300ms, transform 300ms',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(1rem)',
      }}
      className={[
        'flex items-start gap-3 w-full max-w-sm',
        'border-l-4 rounded-md shadow-lg px-4 py-3',
        styles.border,
        styles.bg,
      ].join(' ')}
    >
      {styles.icon}
      <p className="flex-1 text-sm text-gray-800 break-words">{toast.message}</p>
      <button
        type="button"
        onClick={handleClose}
        aria-label="Dismiss notification"
        className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
      >
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>
    </div>
  )
}

// ── Provider ─────────────────────────────────────────────────────────────────

let _toastId = 0

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback(
    (message: string, type: ToastType = 'info', duration: number = 4000) => {
      const id = `toast-${++_toastId}`
      setToasts((prev) => [...prev, { id, message, type, duration }])
    },
    []
  )

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast container */}
      <div
        aria-label="Notifications"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
      >
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
