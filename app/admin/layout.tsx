import Link from 'next/link'
import { SITE_NAME } from '@/lib/constants'

const adminNav = [
  { href: '/admin',          label: 'Dashboard',  icon: '📊' },
  { href: '/admin/products', label: 'Produkty',   icon: '📦' },
  { href: '/products',       label: '→ Sklep',    icon: '🏪' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-bg flex">

      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-dark-surface border-r border-dark-border flex flex-col">
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
          {adminNav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-gray-100 hover:bg-dark-card transition-all duration-200"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-dark-border">
          <Link
            href="/api/admin/logout"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-neon-red transition-colors"
          >
            <span>🚪</span>
            Wyloguj
          </Link>
        </div>
      </aside>

      {/* Główna treść */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
