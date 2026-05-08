import Link from 'next/link'
import { getStats } from '@/lib/products'
import { sql, initDB } from '@/lib/db'
import Button from '@/components/ui/Button'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const stats = await getStats()

  await initDB()

  let orderCount = 0
  let newOrderCount = 0
  let recentOrders: any[] = []

  try {
    const countRows = await sql`SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE status = 'nowe') as nowe FROM orders`
    const counts = Array.isArray(countRows) ? countRows[0] : (countRows as any).rows?.[0]
    orderCount    = Number(counts?.total ?? 0)
    newOrderCount = Number(counts?.nowe  ?? 0)

    const orderRows = await sql`SELECT * FROM orders ORDER BY created_at DESC LIMIT 5`
    recentOrders = Array.isArray(orderRows) ? orderRows : (orderRows as any).rows ?? []
  } catch {}

  const statCards = [
    { label: 'Wszystkie produkty', value: stats.total,      icon: '📦', color: 'border-dark-border' },
    { label: 'Aktywne produkty',   value: stats.active,     icon: '✅', color: 'border-neon-green/20' },
    { label: 'Zamówienia',         value: orderCount,       icon: '📋', color: 'border-neon-cyan/20'  },
    { label: 'Nowe zamówienia',    value: newOrderCount,    icon: '🔔', color: newOrderCount > 0 ? 'border-yellow-500/30' : 'border-dark-border' },
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
            className={`bg-dark-surface border rounded-xl p-5 ${card.color}`}
          >
            <div className="text-2xl mb-3">{card.icon}</div>
            <p className="font-display text-3xl font-bold text-gray-100">{card.value}</p>
            <p className="text-xs text-gray-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Produkty wg kategorii */}
        <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
          <h2 className="font-semibold text-gray-200 mb-5">Produkty wg kategorii</h2>
          <div className="space-y-3">
            {Object.entries(stats.byCategory).map(([cat, count]) => (
              <div key={cat} className="flex items-center justify-between">
                <span className="text-sm text-gray-400 capitalize">{cat}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-dark-border rounded-full overflow-hidden">
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

        {/* Ostatnie zamówienia */}
        <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-200">Ostatnie zamówienia</h2>
            <Link href="/admin/orders" className="text-xs text-neon-cyan hover:underline">
              Zobacz wszystkie →
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-gray-600 text-center py-4">Brak zamówień</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map(order => {
                const statusColors: Record<string, string> = {
                  nowe:         'bg-neon-cyan',
                  w_realizacji: 'bg-yellow-400',
                  zrealizowane: 'bg-neon-green',
                }
                const dot = statusColors[order.status] ?? 'bg-gray-500'
                return (
                  <div key={order.id} className="flex items-center gap-3 py-2 border-b border-dark-border/50 last:border-0">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-300 truncate">{order.imie}</p>
                      <p className="text-xs text-gray-600 truncate">{order.email}</p>
                    </div>
                    <p className="text-xs text-gray-600 flex-shrink-0">
                      {new Date(order.created_at).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' })}
                    </p>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Szybkie linki */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/admin/products" className="bg-dark-surface border border-dark-border hover:border-neon-cyan/30 rounded-xl p-5 group transition-all duration-200">
          <p className="text-2xl mb-2">📋</p>
          <p className="font-semibold text-gray-200 group-hover:text-neon-cyan transition-colors">Lista produktów</p>
          <p className="text-xs text-gray-500 mt-1">Zarządzaj wszystkimi produktami</p>
        </Link>
        <Link href="/admin/orders" className="bg-dark-surface border border-dark-border hover:border-neon-purple/30 rounded-xl p-5 group transition-all duration-200">
          <p className="text-2xl mb-2">📬</p>
          <p className="font-semibold text-gray-200 group-hover:text-neon-purple transition-colors">Zamówienia</p>
          <p className="text-xs text-gray-500 mt-1">
            {newOrderCount > 0 ? `${newOrderCount} nowych do obsłużenia` : 'Wszystkie obsłużone'}
          </p>
        </Link>
        <Link href="/products" target="_blank" className="bg-dark-surface border border-dark-border hover:border-neon-green/30 rounded-xl p-5 group transition-all duration-200">
          <p className="text-2xl mb-2">🏪</p>
          <p className="font-semibold text-gray-200 group-hover:text-neon-green transition-colors">Podgląd sklepu</p>
          <p className="text-xs text-gray-500 mt-1">Otwórz sklep w nowej karcie</p>
        </Link>
      </div>
    </div>
  )
}
