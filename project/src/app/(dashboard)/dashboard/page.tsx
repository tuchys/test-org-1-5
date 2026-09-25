import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard'
}

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">Welcome back to Fashion Kardex.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Products', value: '—', emoji: '📦' },
          { label: 'Total Customers', value: '—', emoji: '👥' },
          { label: 'Sales Today', value: '—', emoji: '🧾' },
          { label: 'Revenue Today', value: '—', emoji: '💰' }
        ].map(({ label, value, emoji }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4"
          >
            <span className="text-3xl">{emoji}</span>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                {label}
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
