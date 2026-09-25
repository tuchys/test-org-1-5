'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  BarChart2,
  X
} from 'lucide-react'
import { logout } from '@/actions/auth'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Products', href: '/products', icon: ShoppingBag },
  { label: 'Customers', href: '/customers', icon: Users },
  { label: 'Sales', href: '/sales', icon: BarChart2 }
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  const sidebarContent = (
    <div className="flex flex-col h-full bg-brand-950 text-white w-64">
      {/* Brand */}
      <div className="flex items-center justify-between h-16 px-5 border-b border-brand-800 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xl">👗</span>
          <span className="font-bold text-lg tracking-tight">Fashion Kardex</span>
        </div>
        {/* Close button – mobile only */}
        <button
          onClick={onClose}
          className="md:hidden p-1 rounded-lg text-brand-300 hover:text-white hover:bg-brand-800 transition-colors"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === '/dashboard'
              ? pathname === '/dashboard' || pathname === '/'
              : pathname === href || pathname.startsWith(href + '/')

          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? 'bg-brand-700 text-white'
                  : 'text-brand-200 hover:bg-brand-800 hover:text-white'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={18} className="shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer / Sign out */}
      <div className="shrink-0 border-t border-brand-800 px-3 py-4">
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-brand-300 hover:bg-brand-800 hover:text-white transition-colors duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[18px] w-[18px] shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
              />
            </svg>
            Sign out
          </button>
        </form>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar — always visible */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-200 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Drawer panel */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 md:hidden flex flex-col transition-transform duration-200 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {sidebarContent}
        </aside>
      </>
    </>
  )
}
