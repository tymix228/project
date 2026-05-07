import Link from 'next/link'
import Image from 'next/image'
import { getProducts } from '@/lib/products'
import { formatPrice, getProductImageSrc } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import DeleteProductButton from './DeleteProductButton'

export default function AdminProductsPage() {
  const { products, total } = getProducts({ sortBy: 'createdAt', order: 'desc' })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold gradient-text">Produkty</h1>
          <p className="text-gray-500 text-sm mt-1">{total} produktów łącznie</p>
        </div>
        <Link href="/admin/products/new">
          <Button>+ Dodaj produkt</Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📦</p>
          <p className="text-gray-500">Brak produktów. Dodaj pierwszy!</p>
        </div>
      ) : (
        <div className="bg-dark-surface border border-dark-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border">
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Produkt
                </th>
                <th className="text-left px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden md:table-cell">
                  Kategoria
                </th>
                <th className="text-left px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Cena
                </th>
                <th className="text-left px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden sm:table-cell">
                  Magazyn
                </th>
                <th className="text-left px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden lg:table-cell">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-dark-card/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-dark-bg">
                        <Image
                          src={getProductImageSrc(product.images)}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-200 truncate max-w-[200px]">
                          {product.name}
                        </p>
                        <div className="flex gap-1 mt-0.5">
                          {product.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} tag={tag} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-xs text-gray-400 capitalize">{product.category}</span>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-mono text-sm text-neon-green font-bold">
                      {formatPrice(product.price)}
                    </p>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <span className={`text-sm font-mono ${product.stock === 0 ? 'text-neon-red' : 'text-gray-400'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        product.isActive
                          ? 'bg-neon-green/10 text-neon-green border border-neon-green/30'
                          : 'bg-gray-700/30 text-gray-500 border border-gray-700'
                      }`}
                    >
                      {product.isActive ? '● Aktywny' : '○ Ukryty'}
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
