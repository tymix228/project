'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { SITE_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'

const adminNav = [
  { href: '/admin',          label: 'Dashboard',  icon: '⬡', exact: true },
  { href: '/admin/products', label: 'Produkty',   icon: '◈', exact: false },
  { href: '/admin/orders',   label: 'Zamówienia', icon: '◉', exact: false },
  { href: '/products',       label: 'Sklep',      icon: '▶', exact: true, external: true },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  function isActive(item: typeof adminNav[0]) {
    if (item.exact) return pathname === item.href
    return pathname.startsWith(item.href)
  }

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {adminNav.map(item => {
        const active = isActive(item)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className={cn(
              'relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group overflow-hidden',
              active
                ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20'
                : item.external
                  ? 'text-gray-500 hover:text-neon-purple hover:bg-neon-purple/5 border border-transparent'
                  : 'text-gray-400 hover:text-gray-100 hover:bg-dark-card border border-transparent'
            )}
          >
            {active && (
              <span className="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-neon-cyan rounded-full" />
            )}
            <span className={cn(
              'font-mono text-base transition-all duration-200',
              active ? 'text-neon-cyan' : 'text-gray-600 group-hover:text-gray-300'
            )}>
              {item.icon}
            </span>
            <span className="flex-1">{item.label}</span>
            {active && (
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            )}
            {item.external && !active && (
              <span className="text-[10px] text-gray-700 font-mono">↗</span>
            )}
          </Link>
        )
      })}
    </>
  )

  return (
    <div className="min-h-screen bg-dark-bg flex">
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex w-60 flex-shrink-0 bg-dark-surface border-r border-dark-border flex-col relative">
        {/* Top neon strip */}
        <div className="h-px bg-gradient-to-r from-neon-cyan via-neon-purple to-transparent opacity-60" />

        <div className="p-5 border-b border-dark-border">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="relative">
              <span className="w-9 h-9 rounded-xl bg-gradient-gaming flex items-center justify-center text-white font-bold text-sm font-display shadow-neon-cyan">
                NF
              </span>
              <span className="absolute -inset-1 rounded-xl bg-neon-cyan/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <p className="font-display text-xs font-bold gradient-text">{SITE_NAME}</p>
              <p className="text-[10px] text-gray-600 font-mono">ADMIN PANEL</p>
            </div>
          </Link>
        </div>

        <div className="px-3 pt-4 pb-1">
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-700 font-mono px-3 mb-2">Nawigacja</p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          <NavLinks />
        </nav>

        <div className="p-3 border-t border-dark-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:text-neon-red hover:bg-neon-red/5 border border-transparent hover:border-neon-red/20 transition-all duration-200 font-medium"
          >
            <span className="font-mono text-base">⬡</span>
            Wyloguj
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm md:hidden"
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
        <div className="h-px bg-gradient-to-r from-neon-cyan via-neon-purple to-transparent opacity-60" />
        <div className="p-5 border-b border-dark-border flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <span className="w-8 h-8 rounded-xl bg-gradient-gaming flex items-center justify-center text-white font-bold text-sm font-display">
              NF
            </span>
            <div>
              <p className="font-display text-xs font-bold gradient-text">{SITE_NAME}</p>
              <p className="text-[10px] text-gray-600 font-mono">ADMIN PANEL</p>
            </div>
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-200 hover:bg-dark-card transition-all text-xs border border-dark-border"
          >
            ✕
          </button>
        </div>

        <div className="px-3 pt-4 pb-1">
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-700 font-mono px-3 mb-2">Nawigacja</p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          <NavLinks onClick={() => setMenuOpen(false)} />
        </nav>

        <div className="p-3 border-t border-dark-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:text-neon-red hover:bg-neon-red/5 border border-transparent hover:border-neon-red/20 transition-all duration-200"
          >
            <span className="font-mono">⬡</span>
            Wyloguj
          </button>
        </div>
      </aside>

      {/* Główna treść */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-dark-surface border-b border-dark-border sticky top-0 z-20">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-neon-cyan via-neon-purple to-transparent opacity-40" />
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col gap-[5px] p-2 rounded-xl hover:bg-dark-card border border-dark-border transition-colors"
            aria-label="Menu"
          >
            <span className="w-4 h-0.5 bg-gray-400 rounded-full" />
            <span className="w-4 h-0.5 bg-neon-cyan rounded-full" />
            <span className="w-3 h-0.5 bg-gray-400 rounded-full" />
          </button>
          <span className="font-display text-sm font-bold gradient-text">{SITE_NAME}</span>
          <span className="text-[10px] text-gray-600 font-mono">ADMIN</span>
        </header>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
