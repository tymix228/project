'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import ThemeToggle from './ThemeToggle'
import { cn } from '@/lib/utils'
import { SITE_NAME } from '@/lib/constants'

const navLinks = [
  { href: '/',         label: 'Główna' },
  { href: '/products', label: 'Sklep' },
  { href: '/order',    label: 'Zamów wydruk', cta: true },
  { href: '/contact',  label: 'Kontakt' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { totalItems } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (pathname?.startsWith('/admin')) return null

  return (
    <header className="sticky top-0 z-50">
      {/* Promo announcement bar */}
      <div className="bg-dark-surface border-b border-dark-border/60 py-1.5 px-4">
        <p className="text-center text-[10px] font-mono text-gray-500">
          <span className="text-neon-cyan/80">⚡</span>
          {' '}Realizacja zamówień od <span className="text-neon-cyan font-bold">24h</span>
          {' · '}
          Wycena <span className="text-neon-green font-bold">bezpłatna</span>
          {' · '}
          Precyzja <span className="text-neon-purple font-bold">0.1mm</span>
        </p>
      </div>

      {/* Gradient top line */}
      <div className="h-px bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/50 to-neon-purple/50" style={{ animation: 'border-flow 5s ease infinite', backgroundSize: '200% 200%' }} />

      {/* Main bar */}
      <div className="border-b border-dark-border bg-dark-bg/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-gaming flex items-center justify-center text-white font-bold text-sm font-display transition-all duration-300 group-hover:shadow-neon-cyan-sm group-hover:scale-105">
                  NF
                </div>
                {/* Glow za logo */}
                <div className="absolute inset-0 rounded-xl bg-neon-cyan/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="font-display font-bold text-lg gradient-text hidden sm:block tracking-wide">
                {SITE_NAME}
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => {
                const isActive = link.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(link.href)

                if (link.cta) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="btn-shine relative ml-2 px-4 py-2 rounded-lg text-sm font-semibold overflow-hidden transition-all duration-200 bg-gradient-gaming text-white hover:shadow-neon-cyan hover:scale-105 active:scale-95"
                    >
                      {link.label}
                    </Link>
                  )
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'text-neon-cyan bg-neon-cyan/5 border border-neon-cyan/15'
                        : 'text-gray-400 hover:text-gray-100 border border-transparent hover:bg-dark-surface/60'
                    )}
                  >
                    {link.label}
                    {/* Active underline */}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3/5 h-0.5 bg-gradient-gaming rounded-full" />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Prawa strona */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              {/* Koszyk */}
              <Link
                href="/cart"
                className="relative group w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-neon-cyan border border-dark-border hover:border-neon-cyan/40 bg-dark-surface/50 hover:bg-neon-cyan/5 transition-all duration-200"
              >
                <svg className="w-4.5 h-4.5 w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-gaming text-white text-[10px] font-bold flex items-center justify-center shadow-neon-cyan-sm animate-zoom-in">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>

              {/* Hamburger mobile */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-1.5 text-gray-400 hover:text-gray-100 border border-dark-border hover:border-neon-cyan/30 transition-all duration-200 bg-dark-surface/50"
                aria-label="Menu"
              >
                <span className={cn('w-4 h-0.5 bg-current rounded transition-all duration-300', mobileOpen && 'rotate-45 translate-y-2')} />
                <span className={cn('w-4 h-0.5 bg-current rounded transition-all duration-300', mobileOpen && 'opacity-0')} />
                <span className={cn('w-4 h-0.5 bg-current rounded transition-all duration-300', mobileOpen && '-rotate-45 -translate-y-2')} />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden border-t border-dark-border py-3 space-y-1 animate-slide-up">
              {navLinks.map(link => {
                const isActive = link.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                      link.cta
                        ? 'text-neon-cyan bg-neon-cyan/5 border border-neon-cyan/20'
                        : isActive
                          ? 'text-neon-cyan bg-neon-cyan/5'
                          : 'text-gray-400 hover:text-gray-100 hover:bg-dark-surface'
                    )}
                  >
                    {isActive && <span className="w-1 h-1 rounded-full bg-neon-cyan" />}
                    {link.label}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
