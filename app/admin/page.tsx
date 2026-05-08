import Link from 'next/link'
import { getStats } from '@/lib/products'
import Button from '@/components/ui/Button'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const stats = await getStats()

  const statCards = [
    { label: 'Wszystkie produkty', value: stats.total,      icon: '📦', color: 'neon-cyan' },
    { label: 'Aktywne',           value: stats.active,     icon: '✅', color: 'neon-green' },
    { label: 'Polecane',          value: stats.featured,   icon: '⭐', color: 'yellow-400' },
    { label: 'Brak w magazynie',  value: stats.outOfStock, icon: '❌', color: 'neon-red' },
  ]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold gradient-text">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Witaj w panelu zarządzania sklepem</p>
        </div>
        <Link href="/admin/products/new">
          <Button>+ Dodaj produkt</Button>
        </Link>
      </div>

      {/* Statystyki */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(card => (
          <div
            key={card.label}
            className="bg-dark-surface border border-dark-border rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{card.icon}</span>
            </div>
            <p className="font-display text-3xl font-bold text-gray-100">{card.value}</p>
            <p className="text-xs text-gray-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Produkty wg kategorii */}
      <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
        <h2 className="font-semibold text-gray-200 mb-5">Produkty wg kategorii</h2>
        <div className="space-y-3">
          {Object.entries(stats.byCategory).map(([cat, count]) => (
            <div key={cat} className="flex items-center justify-between">
              <span className="text-sm text-gray-400 capitalize">{cat}</span>
              <div className="flex items-center gap-3">
                <div className="w-32 h-1.5 bg-dark-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-gaming rounded-full"
                    style={{ width: `${stats.total ? (count / stats.total) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-gray-400 w-4 text-right">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Szybkie linki */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/admin/products" className="bg-dark-surface border border-dark-border hover:border-neon-cyan/30 rounded-xl p-5 group transition-all duration-200">
          <p className="text-2xl mb-2">📋</p>
          <p className="font-semibold text-gray-200 group-hover:text-neon-cyan transition-colors">Lista produktów</p>
          <p className="text-xs text-gray-500 mt-1">Zarządzaj wszystkimi produktami</p>
        </Link>
        <Link href="/admin/products/new" className="bg-dark-surface border border-dark-border hover:border-neon-green/30 rounded-xl p-5 group transition-all duration-200">
          <p className="text-2xl mb-2">➕</p>
          <p className="font-semibold text-gray-200 group-hover:text-neon-green transition-colors">Dodaj produkt</p>
          <p className="text-xs text-gray-500 mt-1">Utwórz nowy produkt</p>
        </Link>
        <Link href="/products" target="_blank" className="bg-dark-surface border border-dark-border hover:border-neon-purple/30 rounded-xl p-5 group transition-all duration-200">
          <p className="text-2xl mb-2">🏪</p>
          <p className="font-semibold text-gray-200 group-hover:text-neon-purple transition-colors">Podgląd sklepu</p>
          <p className="text-xs text-gray-500 mt-1">Otwórz sklep w nowej karcie</p>
        </Link>
      </div>
    </div>
  )
}
