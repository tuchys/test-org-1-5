import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Fashion Kardex',
    template: '%s | Fashion Kardex'
  },
  description: 'CRM and inventory management system for your fashion store — track products, customers, and sales in one place.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
