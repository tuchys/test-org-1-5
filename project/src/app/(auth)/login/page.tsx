import type { Metadata } from 'next'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: 'Sign In'
}

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white shadow-lg rounded-2xl px-8 py-10">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-700 text-white text-3xl mb-4">
            👗
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Fashion Kardex</h1>
          <p className="mt-1 text-sm text-gray-500">Sign in to your store</p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
