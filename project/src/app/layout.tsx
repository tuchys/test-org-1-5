import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "FashionKardex",
    template: "%s | FashionKardex"
  },
  description:
    "CRM y kardex integral para tiendas de ropa. Gestiona clientes, inventario, ventas, catálogo de productos y reportes en un solo lugar.",
  keywords: [
    "CRM ropa",
    "kardex tienda",
    "inventario moda",
    "gestión ventas",
    "clientes tienda de ropa"
  ],
  authors: [{ name: "FashionKardex" }],
  creator: "FashionKardex"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
