export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👗</span>
            <span className="text-xl font-bold text-brand-700">FashionKardex</span>
          </div>
          <nav className="flex items-center gap-4">
            <a
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-brand-700 transition-colors"
            >
              Sign In
            </a>
            <a
              href="/register"
              className="text-sm font-medium bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
            >
              Get Started
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-br from-brand-50 via-white to-purple-50">
        <span className="inline-block bg-brand-100 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
          Clothes Store CRM &amp; Kardex
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Run your boutique <br />
          <span className="text-brand-600">smarter, not harder.</span>
        </h1>
        <p className="max-w-xl text-lg text-gray-500 mb-8">
          FashionKardex is an all-in-one CRM and stock kardex for clothes stores.
          Track customers, manage inventory by size and color, record sales, and
          gain insights — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/register"
            className="bg-brand-600 text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors shadow"
          >
            Start for Free
          </a>
          <a
            href="/login"
            className="bg-white text-brand-700 border border-brand-300 text-sm font-semibold px-6 py-3 rounded-lg hover:bg-brand-50 transition-colors shadow"
          >
            Sign In to Dashboard
          </a>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
            Everything your store needs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "👥",
                title: "Customer CRM",
                desc: "Keep detailed profiles of every customer — purchase history, contact info, and preferences.",
              },
              {
                icon: "📦",
                title: "Inventory Kardex",
                desc: "Track stock levels by product, size, color, and category. Get low-stock alerts instantly.",
              },
              {
                icon: "🧾",
                title: "Sales & Orders",
                desc: "Record sales, issue receipts, apply discounts, and manage returns with ease.",
              },
              {
                icon: "📊",
                title: "Reports & Analytics",
                desc: "Understand your best-selling items, top customers, and revenue trends at a glance.",
              },
              {
                icon: "🏷️",
                title: "Product Catalog",
                desc: "Organize clothes by brand, season, gender, and category with photos and pricing.",
              },
              {
                icon: "🔒",
                title: "Secure & Multi-user",
                desc: "Role-based access for owners and staff. Your data is safe and always available.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-start gap-3 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-3xl">{feature.icon}</span>
                <h3 className="text-base font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} FashionKardex. All rights reserved.
      </footer>
    </main>
  );
}
