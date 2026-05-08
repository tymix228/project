import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getProducts } from '@/lib/products'
import ProductGrid from '@/components/products/ProductGrid'
import ProductFilters from '@/components/products/ProductFilters'
import Spinner from '@/components/ui/Spinner'
import type { ProductCategory, ProductTag } from '@/types'
import { CATEGORIES } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Sklep — NeonForge',
  description: 'Przeglądaj wszystkie produkty z druku 3D dla graczy i twórców.',
}

interface PageProps {
  searchParams: {
    category?: string
    tag?: string
    search?: string
    sort?: string
  }
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const [sortBy, order] = (searchParams.sort || 'createdAt-desc').split('-') as [
    'price' | 'name' | 'createdAt' | 'rating',
    'asc' | 'desc',
  ]

  const { products, total } = await getProducts({
    category: searchParams.category as ProductCategory | undefined,
    tag:      searchParams.tag as ProductTag | undefined,
    search:   searchParams.search,
    sortBy,
    order,
  })

  const hasFilters = !!(searchParams.category || searchParams.tag || searchParams.search)
  const categoryLabel = searchParams.category
    ? CATEGORIES.find(c => c.value === searchParams.category)?.label
    : null

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Nagłówek */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan/80 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            SKLEP
          </div>
          <h1 className="font-display text-4xl font-bold gradient-text mb-2">
            {categoryLabel ? categoryLabel : searchParams.search ? `Wyniki dla: "${searchParams.search}"` : 'Wszystkie produkty'}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-gray-500 text-sm font-mono">
              <span className="text-neon-cyan font-bold">{total}</span> {total === 1 ? 'produkt' : 'produktów'}
              {hasFilters && ' (po filtracji)'}
            </p>
            {hasFilters && (
              <div className="flex items-center gap-1.5">
                {searchParams.category && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-[10px] font-mono">
                    {categoryLabel}
                  </span>
                )}
                {searchParams.tag && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-[10px] font-mono">
                    #{searchParams.tag}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtry */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 bg-dark-surface border border-dark-border rounded-2xl overflow-hidden">
              {/* Top accent */}
              <div className="h-px bg-gradient-gaming opacity-40" />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1.5 h-5 bg-gradient-gaming rounded-full" />
                  <h2 className="font-display font-semibold text-gray-200 text-sm tracking-wide">Filtruj</h2>
                  {hasFilters && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                  )}
                </div>
                <Suspense fallback={<Spinner size="sm" />}>
                  <ProductFilters />
                </Suspense>
              </div>
            </div>
          </aside>

          {/* Siatka produktów */}
          <div className="flex-1">
            <ProductGrid
              products={products}
              emptyMessage={hasFilters ? 'Brak produktów pasujących do filtrów' : 'Brak produktów'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
