export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-950 via-brand-800 to-brand-600 flex flex-col items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Logo / Brand */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
            👗
          </div>
          <span className="text-white text-3xl font-bold tracking-tight">
            Fashion Kardex
          </span>
        </div>

        {/* Tagline */}
        <p className="text-brand-200 text-lg mb-10 leading-relaxed">
          Your all-in-one store management system — inventory, customers, and sales, all in one place.
        </p>

        {/* CTA */}
        <a
          href="/login"
          className="inline-block bg-white text-brand-800 font-semibold text-base px-8 py-3 rounded-xl shadow-lg hover:bg-brand-50 transition-colors duration-200 mb-4 w-full sm:w-auto"
        >
          Sign in to your store
        </a>

        {/* Feature highlights */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl mb-2">📦</div>
            <h3 className="text-white font-semibold text-sm mb-1">Inventory</h3>
            <p className="text-brand-200 text-xs leading-relaxed">
              Track products, variants, and stock levels with adjustment history.
            </p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl mb-2">👥</div>
            <h3 className="text-white font-semibold text-sm mb-1">Customers</h3>
            <p className="text-brand-200 text-xs leading-relaxed">
              Manage customer profiles and view full purchase history at a glance.
            </p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl mb-2">🧾</div>
            <h3 className="text-white font-semibold text-sm mb-1">Sales</h3>
            <p className="text-brand-200 text-xs leading-relaxed">
              Record transactions, handle refunds, and monitor today's revenue.
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-16 text-brand-400 text-xs">
        &copy; {new Date().getFullYear()} Fashion Kardex. Staff portal.
      </footer>
    </main>
  )
}
