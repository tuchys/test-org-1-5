'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  href: string
  label: string
  icon: React.ReactNode
  isCollapsed: boolean
  onClick?: () => void
}

export default function NavLink({
  href,
  label,
  icon,
  isCollapsed,
  onClick
}: NavLinkProps) {
  const pathname = usePathname()

  const isActive =
    href === '/dashboard'
      ? pathname === '/dashboard' || pathname === '/'
      : pathname === href || pathname.startsWith(href + '/')

  return (
    <Link
      href={href}
      onClick={onClick}
      title={isCollapsed ? label : undefined}
      aria-current={isActive ? 'page' : undefined}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
        isCollapsed ? 'justify-center' : ''
      } ${
        isActive
          ? 'bg-brand-700 text-white'
          : 'text-brand-200 hover:bg-brand-800 hover:text-white'
      }`}
    >
      <span className="shrink-0 w-[18px] h-[18px] flex items-center justify-center">
        {icon}
      </span>
      {!isCollapsed && <span>{label}</span>}
    </Link>
  )
}
