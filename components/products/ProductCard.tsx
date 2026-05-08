'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import type { Product } from '@/types'
import { formatPrice, getDiscountPercent, getProductImageSrc, cn } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'
import Badge from '@/components/ui/Badge'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const imageSrc   = getProductImageSrc(product.images)
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price
  const discount   = hasDiscount ? getDiscountPercent(product.price, product.compareAtPrice!) : 0
  const outOfStock = product.stock === 0

  async function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    if (outOfStock) return
    setIsAdding(true)
    addItem(product)
    toast.success(`${product.name} dodano do koszyka`)
    setTimeout(() => setIsAdding(false), 800)
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className={cn(
        'relative rounded-2xl overflow-hidden transition-all duration-400',
        'bg-dark-card border border-dark-border',
        'hover:border-neon-cyan/40 hover:-translate-y-2',
        'hover:shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_0_1px_rgba(0,245,255,0.15)]',
      )}>

        {/* Shine overlay on hover */}
        <div className="btn-shine absolute inset-0 z-20 pointer-events-none" />

        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/0 to-transparent group-hover:via-neon-cyan/50 transition-all duration-500 z-10" />

        {/* ── Zdjęcie ── */}
        <div className="relative aspect-square overflow-hidden bg-dark-surface">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/20 to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-300" />

          {/* Neon glow overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'radial-gradient(circle at 50% 100%, rgba(0,245,255,0.08), transparent 70%)' }}
          />

          {/* Tagi */}
          {product.tags.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-1 z-10">
              {product.tags.slice(0, 2).map(tag => (
                <Badge key={tag} tag={tag} />
              ))}
            </div>
          )}

          {/* Rabat */}
          {discount > 0 && (
            <span className="absolute top-3 right-3 z-10 bg-neon-red text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-neon-red">
              -{discount}%
            </span>
          )}

          {/* Brak w magazynie */}
          {outOfStock && (
            <div className="absolute inset-0 bg-dark-bg/75 flex items-center justify-center z-10 backdrop-blur-sm">
              <span className="text-gray-400 font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-lg border border-dark-border bg-dark-surface/80">
                Brak w magazynie
              </span>
            </div>
          )}

          {/* Quick-view hint */}
          {!outOfStock && (
            <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10">
              <span className="text-xs text-neon-cyan/80 font-mono bg-dark-bg/80 px-3 py-1 rounded-full border border-neon-cyan/20 backdrop-blur-sm">
                Kliknij aby zobaczyć →
              </span>
            </div>
          )}
        </div>

        {/* ── Info ── */}
        <div className="p-4 relative">
          {/* Kategoria / materiał */}
          <p className="text-[11px] text-gray-600 uppercase tracking-widest mb-1 font-mono">
            {product.material || product.category}
          </p>

          {/* Nazwa */}
          <h3 className="font-semibold text-gray-200 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-neon-cyan transition-colors duration-300">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-[11px] ${i < Math.round(product.rating!) ? 'text-yellow-400' : 'text-gray-700'}`}>★</span>
                ))}
              </div>
              <span className="text-[11px] text-gray-500">{product.rating.toFixed(1)}</span>
              <span className="text-[11px] text-gray-700">({product.reviewCount})</span>
            </div>
          )}

          {/* Cena + przycisk */}
          <div className="flex items-end justify-between mt-2">
            <div>
              <p className="font-mono font-bold text-neon-green text-base" style={{ textShadow: '0 0 15px rgba(0,255,136,0.4)' }}>
                {formatPrice(product.price)}
              </p>
              {hasDiscount && (
                <p className="text-xs text-gray-600 line-through font-mono">
                  {formatPrice(product.compareAtPrice!)}
                </p>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={outOfStock || isAdding}
              className={cn(
                'btn-shine relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 overflow-hidden',
                outOfStock
                  ? 'bg-dark-surface text-gray-600 cursor-not-allowed border border-dark-border'
                  : isAdding
                    ? 'bg-neon-green/20 text-neon-green border border-neon-green/40 scale-95'
                    : 'bg-gradient-gaming text-white hover:shadow-neon-cyan hover:scale-105 active:scale-95',
              )}
            >
              {isAdding ? '✓ Dodano' : outOfStock ? 'Brak' : '+ Koszyk'}
            </button>
          </div>
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 bg-gradient-gaming transition-all duration-500 rounded-full" />
      </div>
    </Link>
  )
}
