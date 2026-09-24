import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Authentication Error'
}

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md text-center">
        <div className="bg-white shadow-lg rounded-2xl px-8 py-10">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Authentication Error
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Sorry, something went wrong during authentication. The link may have
            expired or already been used.
          </p>
          <Link
            href="/login"
            className="inline-block bg-brand-700 text-white font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-brand-800 transition-colors duration-200"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
