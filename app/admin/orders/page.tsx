import { sql, initDB } from '@/lib/db'
import OrderActions from './OrderActions'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const STATUS_CONFIG: Record<string, { label: string; dot: string; bg: string; border: string }> = {
  nowe:         { label: 'Nowe',         dot: 'bg-neon-cyan',   bg: 'bg-neon-cyan/10',    border: 'border-neon-cyan/25' },
  w_realizacji: { label: 'W realizacji', dot: 'bg-yellow-400',  bg: 'bg-yellow-400/10',   border: 'border-yellow-400/25' },
  zrealizowane: { label: 'Zrealizowane', dot: 'bg-neon-green',  bg: 'bg-neon-green/10',   border: 'border-neon-green/25' },
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
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest mb-1">Admin / Zamówienia</p>
        <h1 className="font-display text-2xl font-bold gradient-text">Zamówienia</h1>
        <p className="text-gray-500 text-sm mt-1">
          <span className="font-mono text-neon-cyan">{orders.length}</span> zamówień łącznie
        </p>
      </div>

      {dbError && (
        <div className="mb-6 p-4 bg-neon-red/5 border border-neon-red/20 rounded-xl text-neon-red text-sm font-mono">
          Błąd bazy danych: {dbError}
        </div>
      )}

      {/* Stat cards */}
      {orders.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Nowe',         count: nowe,         colorClass: 'text-neon-cyan   border-neon-cyan/25   bg-neon-cyan/5' },
            { label: 'W realizacji', count: w_realizacji, colorClass: 'text-yellow-400  border-yellow-400/25  bg-yellow-400/5' },
            { label: 'Zrealizowane', count: zrealizowane, colorClass: 'text-neon-green  border-neon-green/25  bg-neon-green/5' },
          ].map(stat => (
            <div key={stat.label} className={`border rounded-xl p-4 ${stat.colorClass}`}>
              <p className="font-display text-3xl font-black leading-none mb-1">{stat.count}</p>
              <p className="text-xs font-mono uppercase tracking-wider opacity-70">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {orders.length === 0 && !dbError ? (
        <div className="text-center py-24 bg-dark-surface border border-dark-border rounded-2xl">
          <p className="text-5xl mb-4">📋</p>
          <p className="text-gray-400 font-semibold mb-1">Brak zamówień</p>
          <p className="text-gray-600 text-sm">Gdy klient wyśle formularz — pojawi się tutaj.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const statusCfg = STATUS_CONFIG[order.status] ?? { label: order.status, dot: 'bg-gray-500', bg: 'bg-gray-500/10', border: 'border-gray-500/25' }

            return (
              <div
                key={order.id}
                className="group bg-dark-surface border border-dark-border hover:border-neon-cyan/15 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <div className="h-px bg-gradient-gaming opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="p-5 lg:p-6">
                  {/* Order header */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="relative flex-shrink-0">
                        <span className={`flex items-center justify-center w-10 h-10 rounded-xl font-bold text-sm font-mono ${statusCfg.bg} border ${statusCfg.border}`}>
                          #{String(order.id).slice(-2)}
                        </span>
                        <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${statusCfg.dot} ring-2 ring-dark-surface`} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-100">{order.imie}</p>
                        <a
                          href={`mailto:${order.email}`}
                          className="text-neon-cyan text-sm hover:underline font-mono"
                        >
                          {order.email}
                        </a>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusCfg.bg} ${statusCfg.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot} ${order.status === 'nowe' ? 'animate-pulse' : ''}`} />
                        {statusCfg.label}
                      </span>
                      <p className="text-[10px] text-gray-600 font-mono mt-1.5">
                        {new Date(order.created_at).toLocaleDateString('pl-PL', {
                          day: '2-digit', month: '2-digit', year: 'numeric',
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Order details */}
                  <div className="grid sm:grid-cols-2 gap-3 text-sm mb-5 p-4 bg-dark-bg/50 rounded-xl border border-dark-border">
                    <div className="flex gap-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono w-16 pt-0.5 flex-shrink-0">Model</span>
                      <a
                        href={order.model_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neon-cyan hover:underline truncate text-xs"
                      >
                        {order.model_url}
                      </a>
                    </div>
                    <div className="flex gap-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono w-16 pt-0.5 flex-shrink-0">Materiał</span>
                      <span className="text-gray-300 text-xs">{order.material}</span>
                    </div>
                    {order.kolor && (
                      <div className="flex gap-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono w-16 pt-0.5 flex-shrink-0">Kolor</span>
                        <span className="text-gray-300 text-xs">{order.kolor}</span>
                      </div>
                    )}
                    {order.ilosc && (
                      <div className="flex gap-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono w-16 pt-0.5 flex-shrink-0">Ilość</span>
                        <span className="text-gray-300 text-xs font-mono">{order.ilosc} szt.</span>
                      </div>
                    )}
                    {order.uwagi && (
                      <div className="flex gap-2.5 sm:col-span-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono w-16 pt-0.5 flex-shrink-0">Uwagi</span>
                        <span className="text-gray-300 whitespace-pre-wrap text-xs">{order.uwagi}</span>
                      </div>
                    )}
                  </div>

                  <OrderActions
                    orderId={order.id}
                    currentStatus={order.status ?? 'nowe'}
                    email={order.email}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
