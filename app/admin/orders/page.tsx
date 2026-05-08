import { sql, initDB } from '@/lib/db'
import OrderActions from './OrderActions'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const STATUS_CONFIG: Record<string, { label: string; dot: string }> = {
  nowe:         { label: 'Nowe',         dot: 'bg-neon-cyan' },
  w_realizacji: { label: 'W realizacji', dot: 'bg-yellow-400' },
  zrealizowane: { label: 'Zrealizowane', dot: 'bg-neon-green' },
}

export default async function AdminOrdersPage() {
  await initDB()

  let orders: any[] = []
  let dbError = ''

  try {
    const rows = await sql`SELECT * FROM orders ORDER BY created_at DESC`
    orders = Array.isArray(rows) ? rows : (rows as any).rows ?? []
  } catch (e) {
    dbError = String(e)
  }

  const nowe         = orders.filter(o => o.status === 'nowe').length
  const w_realizacji = orders.filter(o => o.status === 'w_realizacji').length
  const zrealizowane = orders.filter(o => o.status === 'zrealizowane').length

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold gradient-text">Zamówienia</h1>
        <p className="text-gray-500 text-sm mt-1">{orders.length} zamówień łącznie</p>
      </div>

      {dbError && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
          Błąd bazy danych: {dbError}
        </div>
      )}

      {/* Statystyki statusów */}
      {orders.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Nowe',         count: nowe,         color: 'border-neon-cyan/30 text-neon-cyan' },
            { label: 'W realizacji', count: w_realizacji, color: 'border-yellow-500/30 text-yellow-400' },
            { label: 'Zrealizowane', count: zrealizowane, color: 'border-neon-green/30 text-neon-green' },
          ].map(stat => (
            <div key={stat.label} className={`bg-dark-surface border rounded-xl p-4 ${stat.color}`}>
              <p className="font-display text-2xl font-bold">{stat.count}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {orders.length === 0 && !dbError ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📋</p>
          <p className="text-gray-500">Brak zamówień. Gdy klient wyśle formularz — pojawi się tutaj.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const statusCfg = STATUS_CONFIG[order.status] ?? { label: order.status, dot: 'bg-gray-500' }

            return (
              <div key={order.id} className="bg-dark-surface border border-dark-border rounded-xl p-6">
                {/* Nagłówek */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${statusCfg.dot}`} />
                    <div>
                      <p className="font-semibold text-gray-200 text-lg">{order.imie}</p>
                      <a
                        href={`mailto:${order.email}`}
                        className="text-neon-cyan text-sm hover:underline"
                      >
                        {order.email}
                      </a>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-500">#{order.id}</p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {new Date(order.created_at).toLocaleDateString('pl-PL', {
                        day: '2-digit', month: '2-digit', year: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                {/* Szczegóły */}
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="text-gray-500 w-20 flex-shrink-0">Model:</span>
                    <a
                      href={order.model_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neon-cyan hover:underline truncate"
                    >
                      {order.model_url}
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-500 w-20 flex-shrink-0">Materiał:</span>
                    <span className="text-gray-300">{order.material}</span>
                  </div>
                  {order.kolor && (
                    <div className="flex gap-2">
                      <span className="text-gray-500 w-20 flex-shrink-0">Kolor:</span>
                      <span className="text-gray-300">{order.kolor}</span>
                    </div>
                  )}
                  {order.ilosc && order.ilosc !== 1 && (
                    <div className="flex gap-2">
                      <span className="text-gray-500 w-20 flex-shrink-0">Ilość:</span>
                      <span className="text-gray-300">{order.ilosc} szt.</span>
                    </div>
                  )}
                  {order.uwagi && (
                    <div className="flex gap-2 sm:col-span-2">
                      <span className="text-gray-500 w-20 flex-shrink-0">Uwagi:</span>
                      <span className="text-gray-300 whitespace-pre-wrap">{order.uwagi}</span>
                    </div>
                  )}
                </div>

                <OrderActions
                  orderId={order.id}
                  currentStatus={order.status ?? 'nowe'}
                  email={order.email}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
