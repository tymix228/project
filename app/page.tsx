import type { Metadata } from 'next'
import { getProducts } from '@/lib/products'
import HeroSection from '@/components/home/HeroSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoryBanner from '@/components/home/CategoryBanner'
import { FEATURED_PRODUCTS_COUNT } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'NeonForge Store — Druk 3D dla Graczy',
  description: 'Precyzyjnie wydrukowane figurki, akcesoria i gadżety dla graczy, twórców i pasjonatów futurystycznego designu.',
}

export default function HomePage() {
  const { products: featuredProducts } = getProducts({
    featured: true,
    limit: FEATURED_PRODUCTS_COUNT,
    sortBy: 'rating',
    order: 'desc',
  })

  return (
    <>
      <HeroSection />
      <FeaturedProducts products={featuredProducts} />
      <CategoryBanner />

      {/* CTA końcowy */}
      <section className="py-20 bg-dark-bg text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold gradient-text mb-4">
            Gotowy na upgrade swojego setup&apos;u?
          </h2>
          <p className="text-gray-500 mb-8">
            Przeglądaj pełną kolekcję produktów i znajdź coś wyjątkowego.
          </p>
          <a
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-gaming text-white font-semibold hover:shadow-neon-cyan hover:scale-105 transition-all duration-200"
          >
            Przejdź do sklepu →
          </a>
        </div>
      </section>
    </>
  )
}
