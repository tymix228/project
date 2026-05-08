import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getProducts } from '@/lib/products'
import ProductGrid from '@/components/products/ProductGrid'
import ProductFilters from '@/components/products/ProductFilters'
import Spinner from '@/components/ui/Spinner'
import type { ProductCategory, ProductTag } from '@/types'

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

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Nagłówek */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold gradient-text mb-2">Sklep</h1>
          <p className="text-gray-500 text-sm">{total} produktów</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtry */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 bg-dark-surface border border-dark-border rounded-xl p-5">
              <h2 className="font-semibold text-gray-200 mb-5">Filtruj</h2>
              <Suspense fallback={<Spinner size="sm" />}>
                <ProductFilters />
              </Suspense>
            </div>
          </aside>

          {/* Siatka produktów */}
          <div className="flex-1">
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  )
}
