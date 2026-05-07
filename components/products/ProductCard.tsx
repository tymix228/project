'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import type { Product } from '@/types'
import { formatPrice, getDiscountPercent, getProductImageSrc, cn } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const imageSrc = getProductImageSrc(product.images)
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price
  const discount = hasDiscount
    ? getDiscountPercent(product.price, product.compareAtPrice!)
    : 0

  async function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    setIsAdding(true)
    addItem(product)
    toast.success(`${product.name} dodano do koszyka`)
    setTimeout(() => setIsAdding(false), 800)
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div
        className={cn(
          'relative rounded-xl overflow-hidden transition-all duration-300',
          'bg-dark-card border border-dark-border',
          'hover:border-neon-cyan/30 hover:shadow-neon-cyan hover:-translate-y-1'
        )}
      >
        {/* Zdjęcie */}
        <div className="relative aspect-square overflow-hidden bg-dark-surface">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Nakładka hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badge'y */}
          {product.tags.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
              {product.tags.slice(0, 2).map(tag => (
                <Badge key={tag} tag={tag} />
              ))}
            </div>
          )}

          {/* % zniżki */}
          {discount > 0 && (
            <span className="absolute top-3 right-3 bg-neon-red text-white text-xs font-bold px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          )}

          {/* Stan magazynowy */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-dark-bg/70 flex items-center justify-center">
              <span className="text-gray-400 font-semibold text-sm uppercase tracking-wider">
                Brak w magazynie
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            {product.material || product.category}
          </p>
          <h3 className="font-semibold text-gray-100 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-neon-cyan transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <span className="text-yellow-400 text-xs">★</span>
              <span className="text-xs text-gray-400">{product.rating.toFixed(1)}</span>
              <span className="text-xs text-gray-600">({product.reviewCount})</span>
            </div>
          )}

          {/* Cena */}
          <div className="flex items-end justify-between mt-3">
            <div>
              <p className="font-mono font-bold text-neon-green text-base">
                {formatPrice(product.price)}
              </p>
              {hasDiscount && (
                <p className="text-xs text-gray-500 line-through font-mono">
                  {formatPrice(product.compareAtPrice!)}
                </p>
              )}
            </div>

            <Button
              size="sm"
              variant="primary"
              isLoading={isAdding}
              disabled={product.stock === 0}
              onClick={handleAddToCart}
              className="text-xs px-3 py-1.5"
            >
              + Koszyk
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
