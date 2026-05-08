import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductBySlug } from '@/lib/products'
import ProductDetail from '@/components/products/ProductDetail'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  if (!product) return { title: 'Produkt nie znaleziony' }
  return {
    title: product.name,
    description: product.shortDescription,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProductBySlug(params.slug)
  if (!product) notFound()
  return <ProductDetail product={product} />
}
