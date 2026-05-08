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
  let inProgressCount = 0
  let recentOrders: any[] = []

  try {
    const countRows = await sql`SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE status = 'nowe') as nowe, COUNT(*) FILTER (WHERE status = 'w_realizacji') as w_realizacji FROM orders`
    const counts = Array.isArray(countRows) ? countRows[0] : (countRows as any).rows?.[0]
    orderCount     = Number(counts?.total ?? 0)
    newOrderCount  = Number(counts?.nowe  ?? 0)
    inProgressCount = Number(counts?.w_realizacji ?? 0)

    const orderRows = await sql`SELECT * FROM orders ORDER BY created_at DESC LIMIT 5`
    recentOrders = Array.isArray(orderRows) ? orderRows : (orderRows as any).rows ?? []
  } catch {}

  const statCards = [
    { label: 'Produkty', sublabel: 'w bazie', value: stats.total, icon: '◈', color: 'neon-cyan', href: '/admin/products' },
    { label: 'Aktywne', sublabel: 'widoczne', value: stats.active, icon: '◉', color: 'neon-green', href: '/admin/products' },
    { label: 'Zamówienia', sublabel: 'łącznie', value: orderCount, icon: '⬡', color: 'neon-purple', href: '/admin/orders' },
    { label: 'Nowe', sublabel: newOrderCount > 0 ? 'do obsłużenia' : 'brak nowych', value: newOrderCount, icon: '◈', color: newOrderCount > 0 ? 'yellow-400' : 'gray-600', href: '/admin/orders' },
  ]

  const statusDots: Record<string, string> = {
    nowe:         'bg-neon-cyan',
    w_realizacji: 'bg-yellow-400',
    zrealizowane: 'bg-neon-green',
  }
  const statusLabels: Record<string, string> = {
    nowe:         'Nowe',
    w_realizacji: 'W realizacji',
    zrealizowane: 'Zrealizowane',
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest mb-1">Admin / Dashboard</p>
          <h1 className="font-display text-2xl font-bold gradient-text">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Witaj w panelu zarządzania sklepem NeonForge</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="btn-shine">+ Dodaj produkt</Button>
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, i) => (
          <Link
            key={card.label}
            href={card.href}
            className="group relative bg-dark-surface border border-dark-border hover:border-neon-cyan/20 rounded-2xl p-5 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-start justify-between mb-4">
              <span className="font-mono text-xl text-gray-700 group-hover:text-neon-cyan transition-colors duration-300">
                {card.icon}
              </span>
              {card.label === 'Nowe' && newOrderCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              )}
            </div>
            <p className="font-display text-4xl font-black text-gray-100 group-hover:text-neon-cyan transition-colors duration-300 leading-none mb-2">
              {card.value}
            </p>
            <p className="text-xs font-semibold text-gray-300">{card.label}</p>
            <p className="text-[10px] text-gray-600 font-mono uppercase tracking-wider">{card.sublabel}</p>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/20 to-neon-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Produkty wg kategorii */}
        <div className="bg-dark-surface border border-dark-border rounded-2xl overflow-hidden">
          <div className="h-px bg-gradient-gaming opacity-20" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-gray-200 text-sm uppercase tracking-wider font-mono">Produkty wg kategorii</h2>
              <Link href="/admin/products" className="text-[10px] text-neon-cyan font-mono hover:underline">
                Zarządzaj →
              </Link>
            </div>
            <div className="space-y-3">
              {Object.entries(stats.byCategory).length === 0 ? (
                <p className="text-sm text-gray-600 text-center py-4 font-mono">Brak danych</p>
              ) : Object.entries(stats.byCategory).map(([cat, count]) => (
                <div key={cat} className="flex items-center justify-between group">
                  <span className="text-sm text-gray-400 capitalize group-hover:text-gray-200 transition-colors">{cat}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-28 h-1.5 bg-dark-border rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${stats.total ? (count / stats.total) * 100 : 0}%`,
                          background: 'linear-gradient(to right, #00F5FF, #B400FF)'
                        }}
                      />
                    </div>
                    <span className="text-xs font-mono text-neon-cyan w-4 text-right font-bold">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ostatnie zamówienia */}
        <div className="bg-dark-surface border border-dark-border rounded-2xl overflow-hidden">
          <div className="h-px bg-gradient-gaming opacity-20" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-gray-200 text-sm uppercase tracking-wider font-mono">Ostatnie zamówienia</h2>
              <Link href="/admin/orders" className="text-[10px] text-neon-cyan font-mono hover:underline">
                Wszystkie →
              </Link>
            </div>
            {recentOrders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-3xl mb-2">📋</p>
                <p className="text-sm text-gray-600 font-mono">Brak zamówień</p>
              </div>
            ) : (
              <div className="space-y-2">
                {recentOrders.map(order => {
                  const dot = statusDots[order.status] ?? 'bg-gray-500'
                  const label = statusLabels[order.status] ?? order.status
                  return (
                    <div key={order.id} className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-dark-bg transition-colors group">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-300 truncate group-hover:text-gray-100 transition-colors">{order.imie}</p>
                        <p className="text-xs text-gray-600 truncate font-mono">{order.email}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[10px] text-gray-600 font-mono">{label}</p>
                        <p className="text-[10px] text-gray-700">
                          {new Date(order.created_at).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-700 font-mono mb-3">Szybkie akcje</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/admin/products"
            className="group relative bg-dark-surface border border-dark-border hover:border-neon-cyan/30 rounded-2xl p-5 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-neon-cyan/0 group-hover:bg-neon-cyan/3 transition-colors" />
            <div className="relative">
              <p className="font-mono text-2xl mb-3 group-hover:-translate-y-0.5 transition-transform duration-200">◈</p>
              <p className="font-semibold text-gray-200 group-hover:text-neon-cyan transition-colors text-sm">Lista produktów</p>
              <p className="text-xs text-gray-600 mt-1">Zarządzaj wszystkimi produktami</p>
            </div>
          </Link>
          <Link
            href="/admin/orders"
            className="group relative bg-dark-surface border border-dark-border hover:border-neon-purple/30 rounded-2xl p-5 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-neon-purple/0 group-hover:bg-neon-purple/3 transition-colors" />
            {newOrderCount > 0 && (
              <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-mono text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                {newOrderCount} nowe
              </span>
            )}
            <div className="relative">
              <p className="font-mono text-2xl mb-3 group-hover:-translate-y-0.5 transition-transform duration-200">◉</p>
              <p className="font-semibold text-gray-200 group-hover:text-neon-purple transition-colors text-sm">Zamówienia</p>
              <p className="text-xs text-gray-600 mt-1">
                {newOrderCount > 0 ? `${newOrderCount} nowych do obsłużenia` : 'Wszystkie obsłużone'}
              </p>
            </div>
          </Link>
          <Link
            href="/products"
            target="_blank"
            className="group relative bg-dark-surface border border-dark-border hover:border-neon-green/30 rounded-2xl p-5 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-neon-green/0 group-hover:bg-neon-green/3 transition-colors" />
            <div className="relative">
              <p className="font-mono text-2xl mb-3 group-hover:-translate-y-0.5 transition-transform duration-200">▶</p>
              <p className="font-semibold text-gray-200 group-hover:text-neon-green transition-colors text-sm">Podgląd sklepu</p>
              <p className="text-xs text-gray-600 mt-1">Otwórz sklep w nowej karcie ↗</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
