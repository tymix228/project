import type { Metadata } from 'next'
import { getProducts } from '@/lib/products'
import HeroSection from '@/components/home/HeroSection'
import MarqueeBanner from '@/components/home/MarqueeBanner'
import StatsSection from '@/components/home/StatsSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoryBanner from '@/components/home/CategoryBanner'
import HowItWorks from '@/components/home/HowItWorks'
import CtaBanner from '@/components/home/CtaBanner'
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
      <MarqueeBanner />
      <StatsSection />
      {featuredProducts.length > 0 && <FeaturedProducts products={featuredProducts} />}
      <HowItWorks />
      <CtaBanner />
      <CategoryBanner />
    </>
  )
}
