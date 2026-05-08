import Link from 'next/link'
import Image from 'next/image'
import { getAllProductsAdmin } from '@/lib/products'
import { formatPrice, getProductImageSrc } from '@/lib/utils'
import { CATEGORIES } from '@/lib/constants'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import DeleteProductButton from './DeleteProductButton'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const { products, total } = await getAllProductsAdmin()

  return (
    <div className="p-6 lg:p-8">
      {/* Nagłówek */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs text-gray-600 font-mono uppercase tracking-widest mb-1">Admin / Produkty</p>
          <h1 className="font-display text-2xl font-bold gradient-text">Produkty</h1>
          <p className="text-gray-500 text-sm mt-1">
            <span className="font-mono text-neon-cyan">{total}</span> produktów łącznie
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button className="btn-shine">+ Dodaj produkt</Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-dark-surface border border-dark-border rounded-2xl">
          <p className="text-5xl mb-4">📦</p>
          <p className="text-gray-500">Brak produktów. Dodaj pierwszy!</p>
        </div>
      ) : (
        <div className="bg-dark-surface border border-dark-border rounded-2xl overflow-hidden">
          {/* Top accent */}
          <div className="h-px bg-gradient-gaming opacity-30" />

          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border bg-dark-bg/30">
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono">
                  Produkt
                </th>
                <th className="text-left px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono hidden md:table-cell">
                  Kategoria
                </th>
                <th className="text-left px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono">
                  Cena
                </th>
                <th className="text-left px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono hidden sm:table-cell">
                  Magazyn
                </th>
                <th className="text-left px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono hidden lg:table-cell">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {products.map(product => (
                <tr
                  key={product.id}
                  className="group hover:bg-neon-cyan/3 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-dark-bg border border-dark-border group-hover:border-neon-cyan/20 transition-colors">
                        <Image
                          src={getProductImageSrc(product.images)}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <p className="text-sm font-medium text-gray-200 truncate max-w-[160px] group-hover:text-neon-cyan transition-colors duration-150">
                            {product.name}
                          </p>
                          {product.isFeatured && (
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-neon-gold" title="Polecany" />
                          )}
                        </div>
                        <div className="flex gap-1">
                          {product.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} tag={tag} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{CATEGORIES.find(c => c.value === product.category)?.icon}</span>
                      <span className="text-xs text-gray-500 font-mono">
                        {CATEGORIES.find(c => c.value === product.category)?.label || product.category}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-mono text-sm text-neon-green font-bold" style={{ textShadow: '0 0 10px rgba(0,255,136,0.3)' }}>
                      {formatPrice(product.price)}
                    </p>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <span className={`text-sm font-mono font-bold ${
                      product.stock === 0 ? 'text-neon-red' : product.stock <= 3 ? 'text-yellow-400' : 'text-gray-400'
                    }`}>
                      {product.stock === 0 ? '✕ 0' : product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      product.isActive
                        ? 'bg-neon-green/10 text-neon-green border-neon-green/25'
                        : 'bg-dark-bg text-gray-600 border-dark-border'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${product.isActive ? 'bg-neon-green animate-pulse' : 'bg-gray-600'}`} />
                      {product.isActive ? 'Aktywny' : 'Ukryty'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/products/${product.id}`}>
                        <Button variant="outline" size="sm">Edytuj</Button>
                      </Link>
                      <DeleteProductButton productId={product.id} productName={product.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
