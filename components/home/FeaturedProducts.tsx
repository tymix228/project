import Link from 'next/link'
import type { Product } from '@/types'
import ProductCard from '@/components/products/ProductCard'

interface FeaturedProductsProps {
  products: Product[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length === 0) return null

  return (
    <section className="py-24 bg-dark-bg relative overflow-hidden">
      {/* Delikatna siatka */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Orb tło */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-neon-purple/4 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Nagłówek sekcji */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-purple/25 bg-neon-purple/5 text-neon-purple/80 text-xs font-mono mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-purple animate-pulse" />
              TOP PRODUKTY
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-100 mb-2">
              Polecane produkty
            </h2>
            {/* Animowana linia pod nagłówkiem */}
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-20 bg-gradient-gaming rounded-full" style={{ animation: 'border-flow 3s ease infinite', backgroundSize: '200% 200%' }} />
              <div className="h-0.5 w-6 bg-neon-cyan/20 rounded-full" />
              <div className="h-0.5 w-2 bg-neon-cyan/10 rounded-full" />
            </div>
          </div>

          <Link
            href="/products"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-dark-border text-sm font-medium text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/40 hover:bg-neon-cyan/5 transition-all duration-200 self-start sm:self-auto"
          >
            Zobacz wszystkie
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Grid produktów */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="animate-slide-up"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
