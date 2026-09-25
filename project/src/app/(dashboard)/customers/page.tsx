import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Customers'
}

export default function CustomersPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-500 text-sm mt-1">
            View and manage your customer list.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-700 text-white text-sm font-semibold hover:bg-brand-800 transition-colors"
        >
          + Add customer
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center text-gray-400">
        <span className="text-4xl">👥</span>
        <p className="mt-3 text-sm">No customers yet. Add your first customer to get started.</p>
      </div>
    </div>
  )
}
