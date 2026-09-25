'use client'

import { Menu } from 'lucide-react'

interface MobileHeaderProps {
  onMenuToggle: () => void
}

export default function MobileHeader({ onMenuToggle }: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center h-14 px-4 bg-brand-950 text-white shadow-md md:hidden">
      <button
        onClick={onMenuToggle}
        className="p-1.5 rounded-lg text-brand-200 hover:text-white hover:bg-brand-800 transition-colors"
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      <div className="flex items-center gap-2 ml-3">
        <span className="text-lg">👗</span>
        <span className="font-bold tracking-tight text-base">Fashion Kardex</span>
      </div>
    </header>
  )
}
