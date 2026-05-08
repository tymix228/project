import type { Product } from '@/types'
import ProductCard from './ProductCard'
import Spinner from '@/components/ui/Spinner'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
  emptyMessage?: string
}

export default function ProductGrid({
  products,
  isLoading,
  emptyMessage = 'Nie znaleziono produktów',
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="relative">
          <Spinner size="lg" />
          <div className="absolute inset-0 rounded-full bg-neon-cyan/10 blur-md animate-ping-slow" />
        </div>
        <p className="text-xs text-gray-600 font-mono animate-pulse">Ładowanie produktów...</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-5 text-center relative">
        <div className="absolute inset-0 dot-bg opacity-30 pointer-events-none rounded-2xl" />

        <div
          className="w-24 h-24 rounded-3xl bg-dark-surface border border-dark-border flex items-center justify-center text-5xl float-animation"
          style={{ boxShadow: '0 0 30px rgba(0,245,255,0.06)' }}
        >
          🔍
        </div>
        <div>
          <p className="text-gray-300 text-lg font-semibold mb-1">{emptyMessage}</p>
          <p className="text-gray-600 text-sm">Spróbuj zmienić filtry lub wyszukaj coś innego</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 text-xs font-mono text-gray-700">
          {['Figurki', 'Akcesoria', 'Cosplay', 'Teren RPG'].map(cat => (
            <span key={cat} className="px-3 py-1 rounded-full border border-dark-border">{cat}</span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product, i) => (
        <div
          key={product.id}
          className="animate-slide-up"
          style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}
