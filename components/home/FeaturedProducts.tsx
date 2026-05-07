import Link from 'next/link'
import type { Product } from '@/types'
import ProductCard from '@/components/products/ProductCard'
import Button from '@/components/ui/Button'

interface FeaturedProductsProps {
  products: Product[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length === 0) return null

  return (
    <section className="py-20 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Nagłówek sekcji */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neon-cyan mb-2">
              Bestsellery
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-100">
              Polecane produkty
            </h2>
          </div>
          <Link href="/products?tag=featured">
            <Button variant="ghost" size="sm">
              Zobacz wszystkie →
            </Button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
