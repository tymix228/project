import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductBySlug, getProducts } from '@/lib/products'
import ProductDetail from '@/components/products/ProductDetail'

interface PageProps {
  params: { slug: string }
}

// Generuje metadane SEO dla każdego produktu
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return { title: 'Produkt nie znaleziony' }

  return {
    title: product.name,
    description: product.shortDescription,
  }
}

// Generuje statyczne ścieżki (opcjonalne — przy małej bazie przyspiesza build)
export async function generateStaticParams() {
  const { products } = getProducts()
  return products.map(p => ({ slug: p.slug }))
}

// Server Component — bezpiecznie czyta z filesystem
export default function ProductPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  // Przekaż dane do Client Component
  return <ProductDetail product={product} />
}
