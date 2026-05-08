import type { Metadata } from 'next'
import { getProducts } from '@/lib/products'
import HeroSection from '@/components/home/HeroSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoryBanner from '@/components/home/CategoryBanner'
import { FEATURED_PRODUCTS_COUNT } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'NeonForge Store — Druk 3D dla Graczy',
  description: 'Precyzyjnie wydrukowane figurki, akcesoria i gadżety dla graczy, twórców i pasjonatów futurystycznego designu.',
}

export default async function HomePage() {
  const { products: featuredProducts } = await getProducts({
    featured: true,
    limit: FEATURED_PRODUCTS_COUNT,
    sortBy: 'rating',
    order: 'desc',
  })

  return (
    <>
      <HeroSection />
      {featuredProducts.length > 0 && <FeaturedProducts products={featuredProducts} />}
      <CategoryBanner />
    </>
  )
}
