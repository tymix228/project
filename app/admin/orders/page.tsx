import { sql, initDB } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold gradient-text">Zamówienia</h1>
        <p className="text-gray-500 text-sm mt-1">{orders.length} zamówień łącznie</p>
      </div>

      {dbError && (
        <div className="mb-4 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
          Błąd bazy danych: {dbError}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📋</p>
          <p className="text-gray-500">Brak zamówień. Gdy klient wyśle formularz — pojawi się tutaj.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-dark-surface border border-dark-border rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="font-semibold text-gray-200 text-lg">{order.imie}</p>
                  <a href={`mailto:${order.email}`} className="text-neon-cyan text-sm hover:underline">
                    {order.email}
                  </a>
                </div>
                <p className="text-xs text-gray-600">
                  {new Date(order.created_at).toLocaleDateString('pl-PL', {
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                  })}
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-gray-500 w-20 flex-shrink-0">Model:</span>
                  <a href={order.model_url} target="_blank" rel="noopener noreferrer"
                    className="text-neon-cyan hover:underline truncate">{order.model_url}</a>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-500 w-20 flex-shrink-0">Materiał:</span>
                  <span className="text-gray-300">{order.material}</span>
                </div>
                {order.uwagi && (
                  <div className="flex gap-2">
                    <span className="text-gray-500 w-20 flex-shrink-0">Uwagi:</span>
                    <span className="text-gray-300">{order.uwagi}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-dark-border">
                <a href={`https://mail.google.com/mail/?view=cm&to=${order.email}&su=Odpowiedź na zamówienie wydruku`}
                  target="_blank" rel="noopener noreferrer"
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
