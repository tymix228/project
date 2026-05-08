'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { SITE_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'

const adminNav = [
  { href: '/admin',          label: 'Dashboard',  icon: '📊' },
  { href: '/admin/products', label: 'Produkty',   icon: '📦' },
  { href: '/admin/orders',   label: 'Zamówienia', icon: '📋' },
  { href: '/products',       label: '→ Sklep',    icon: '🏪' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {adminNav.map(item => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClick}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200',
            pathname === item.href
              ? 'bg-dark-card text-neon-cyan'
              : 'text-gray-400 hover:text-gray-100 hover:bg-dark-card'
          )}
        >
          <span>{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </>
  )

  return (
    <div className="min-h-screen bg-dark-bg flex">
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex w-56 flex-shrink-0 bg-dark-surface border-r border-dark-border flex-col">
        <div className="p-5 border-b border-dark-border">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-gaming flex items-center justify-center text-white font-bold text-sm font-display">
              NF
            </span>
            <div>
              <p className="font-display text-xs font-bold gradient-text">{SITE_NAME}</p>
              <p className="text-[10px] text-gray-600">Admin Panel</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <NavLinks />
        </nav>

        <div className="p-3 border-t border-dark-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-neon-red hover:bg-neon-red/5 transition-all duration-200"
          >
            <span>🚪</span>
            Wyloguj
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar — mobile drawer */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full z-40 w-64 bg-dark-surface border-r border-dark-border flex flex-col transition-transform duration-300 md:hidden',
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-5 border-b border-dark-border flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <span className="w-8 h-8 rounded-lg bg-gradient-gaming flex items-center justify-center text-white font-bold text-sm font-display">
              NF
            </span>
            <div>
              <p className="font-display text-xs font-bold gradient-text">{SITE_NAME}</p>
              <p className="text-[10px] text-gray-600">Admin Panel</p>
            </div>
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-500 hover:text-gray-200 transition-colors p-1"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <NavLinks onClick={() => setMenuOpen(false)} />
        </nav>

        <div className="p-3 border-t border-dark-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-neon-red hover:bg-neon-red/5 transition-all duration-200"
          >
            <span>🚪</span>
            Wyloguj
          </button>
        </div>
      </aside>

      {/* Główna treść */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-dark-surface border-b border-dark-border sticky top-0 z-20">
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col gap-1 p-2 rounded-lg hover:bg-dark-card transition-colors"
            aria-label="Menu"
          >
            <span className="w-5 h-0.5 bg-gray-400 rounded" />
            <span className="w-5 h-0.5 bg-gray-400 rounded" />
            <span className="w-5 h-0.5 bg-gray-400 rounded" />
          </button>
          <span className="font-display text-sm font-bold gradient-text">{SITE_NAME} Admin</span>
        </header>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
