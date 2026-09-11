import Link from "next/link";

const features = [
  {
    icon: "👥",
    title: "CRM de Clientes",
    description:
      "Registra y gestiona el historial de compras, preferencias y datos de contacto de cada cliente."
  },
  {
    icon: "📦",
    title: "Kardex de Inventario",
    description:
      "Control de stock por producto, talla y color. Alertas automáticas de bajo inventario."
  },
  {
    icon: "🛍️",
    title: "Ventas y Pedidos",
    description:
      "Crea ventas rápidamente, aplica descuentos, gestiona devoluciones y genera comprobantes."
  },
  {
    icon: "📊",
    title: "Reportes y Analítica",
    description:
      "Visualiza ingresos, productos más vendidos y mejores clientes con gráficas claras."
  },
  {
    icon: "👗",
    title: "Catálogo de Productos",
    description:
      "Organiza tu catálogo por marca, categoría, género y temporada con fotos y precios."
  },
  {
    icon: "🔐",
    title: "Multi-usuario y Roles",
    description:
      "Asigna roles de propietario o empleado con permisos diferenciados para tu equipo."
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👗</span>
            <span className="text-xl font-bold text-brand-700">
              FashionKardex
            </span>
          </div>
          <nav className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-brand-700 transition-colors px-3 py-2 rounded-md"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Registrarse
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-fuchsia-500 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span>✨</span>
            <span>Gestión integral para tu tienda de ropa</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Tu tienda de ropa,{" "}
            <span className="text-fuchsia-200">totalmente organizada</span>
          </h1>
          <p className="text-lg sm:text-xl text-brand-100 max-w-2xl mx-auto mb-10">
            FashionKardex es el CRM y kardex diseñado para tiendas de moda.
            Controla clientes, inventario, ventas y reportes desde un solo
            panel, fácil y rápido.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto bg-white text-brand-700 hover:bg-brand-50 font-semibold px-8 py-3 rounded-lg text-base transition-colors shadow-md"
            >
              Comenzar gratis
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto border border-white/40 hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-lg text-base transition-colors"
            >
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Todo lo que tu tienda necesita
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Desde el primer cliente hasta el último reporte, FashionKardex lo
              tiene cubierto.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-brand-200 transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-brand-50 border-y border-brand-100 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-800 mb-4">
            ¿Listo para ordenar tu negocio?
          </h2>
          <p className="text-brand-600 mb-8">
            Regístrate en minutos y empieza a gestionar tu tienda de ropa hoy
            mismo.
          </p>
          <Link
            href="/register"
            className="inline-block bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow"
          >
            Crear mi cuenta gratis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span>👗</span>
            <span className="font-semibold text-gray-600">FashionKardex</span>
          </div>
          <p>© {new Date().getFullYear()} FashionKardex. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-brand-600 transition-colors">
              Iniciar sesión
            </Link>
            <Link href="/register" className="hover:text-brand-600 transition-colors">
              Registrarse
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
