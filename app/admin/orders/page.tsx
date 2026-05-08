import { sql, initDB } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminOrdersPage() {
  await initDB()
  const orders = await sql`SELECT * FROM orders ORDER BY created_at DESC`

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold gradient-text">Zamówienia</h1>
        <p className="text-gray-500 text-sm mt-1">{orders.length} zamówień łącznie</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📋</p>
          <p className="text-gray-500">Brak zamówień. Gdy klient wyśle formularz — pojawi się tutaj.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id as number} className="bg-dark-surface border border-dark-border rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="font-semibold text-gray-200 text-lg">{order.imie as string}</p>
                  <a href={`mailto:${order.email}`} className="text-neon-cyan text-sm hover:underline">
                    {order.email as string}
                  </a>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">
                    {order.status as string}
                  </span>
                  <p className="text-xs text-gray-600 mt-1">
                    {new Date(order.created_at as string).toLocaleDateString('pl-PL', {
                      day: '2-digit', month: '2-digit', year: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-gray-500 w-20 flex-shrink-0">Model:</span>
                  <a href={order.model_url as string} target="_blank" rel="noopener noreferrer"
                    className="text-neon-cyan hover:underline truncate">
                    {order.model_url as string}
                  </a>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-500 w-20 flex-shrink-0">Materiał:</span>
                  <span className="text-gray-300">{order.material as string}</span>
                </div>
                {order.uwagi && (
                  <div className="flex gap-2">
                    <span className="text-gray-500 w-20 flex-shrink-0">Uwagi:</span>
                    <span className="text-gray-300">{order.uwagi as string}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-dark-border">
                <a href={`mailto:${order.email}?subject=Odpowiedź na zamówienie wydruku`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-gaming text-white text-sm font-medium hover:opacity-90 transition-all">
                  ✉️ Odpowiedz klientowi
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
