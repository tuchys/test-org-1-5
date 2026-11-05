'use client'

import NavLink from './NavLink'
import { logout } from '@/actions/auth'

// SVG Icons as inline components (no lucide-react dependency required)
const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[18px] h-[18px]"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
)

const ProductsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[18px] h-[18px]"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
)

const CustomersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[18px] h-[18px]"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const SalesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[18px] h-[18px]"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
)

const SignOutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[18px] h-[18px] shrink-0"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Products', href: '/products', icon: <ProductsIcon /> },
  { label: 'Customers', href: '/customers', icon: <CustomersIcon /> },
  { label: 'Sales', href: '/sales', icon: <SalesIcon /> }
]

interface SidebarProps {
  /** Desktop collapsed state */
  isCollapsed: boolean
  /** Mobile drawer open state */
  mobileOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isCollapsed, mobileOpen, onClose }: SidebarProps) {
  const sidebarContent = (
    <div
      className={`flex flex-col h-full bg-brand-950 text-white transition-all duration-200 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand */}
      <div
        className={`flex items-center h-16 px-4 border-b border-brand-800 shrink-0 ${
          isCollapsed ? 'justify-center' : 'justify-between'
        }`}
      >
        <div className={`flex items-center gap-2 ${isCollapsed ? 'justify-center' : ''}`}>
          <span className="text-xl shrink-0">👗</span>
          {!isCollapsed && (
            <span className="font-bold text-base tracking-tight whitespace-nowrap">
              Fashion Kardex
            </span>
          )}
        </div>
        {/* Close button – mobile only */}
        {!isCollapsed && (
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded-lg text-brand-300 hover:text-white hover:bg-brand-800 transition-colors"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map(({ label, href, icon }) => (
          <NavLink
            key={href}
            href={href}
            label={label}
            icon={icon}
            isCollapsed={isCollapsed}
            onClick={onClose}
          />
        ))}
      </nav>

      {/* Footer / Sign out */}
      <div className="shrink-0 border-t border-brand-800 px-2 py-4">
        <form action={logout}>
          <button
            type="submit"
            title={isCollapsed ? 'Sign out' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-brand-300 hover:bg-brand-800 hover:text-white transition-colors duration-150 ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <SignOutIcon />
            {!isCollapsed && <span>Sign out</span>}
          </button>
        </form>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex md:flex-col h-screen sticky top-0 shrink-0 transition-all duration-200 ${
          isCollapsed ? 'md:w-16' : 'md:w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-200 ${
            mobileOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Drawer panel */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 md:hidden flex flex-col transition-transform duration-200 ease-in-out ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Mobile drawer always uses full-width (not collapsed) */}
          <div className="flex flex-col h-full bg-brand-950 text-white w-64">
            {/* Brand */}
            <div className="flex items-center justify-between h-16 px-5 border-b border-brand-800 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xl">👗</span>
                <span className="font-bold text-base tracking-tight">Fashion Kardex</span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-brand-300 hover:text-white hover:bg-brand-800 transition-colors"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
              {navItems.map(({ label, href, icon }) => (
                <NavLink
                  key={href}
                  href={href}
                  label={label}
                  icon={icon}
                  isCollapsed={false}
                  onClick={onClose}
                />
              ))}
            </nav>

            {/* Footer / Sign out */}
            <div className="shrink-0 border-t border-brand-800 px-2 py-4">
              <form action={logout}>
                <button
                  type="submit"
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-brand-300 hover:bg-brand-800 hover:text-white transition-colors duration-150"
                >
                  <SignOutIcon />
                  <span>Sign out</span>
                </button>
              </form>
            </div>
          </div>
        </aside>
      </>
    </>
  )
}
