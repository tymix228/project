'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import type { Product } from '@/types'
import { formatPrice, getDiscountPercent, getProductImageSrc } from '@/lib/utils'
import { CATEGORIES } from '@/lib/constants'
import { useCart } from '@/hooks/useCart'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart()
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id || undefined)
  const [selectedImage, setSelectedImage]         = useState(0)
  const [isAdding, setIsAdding]                   = useState(false)

  const variant      = product.variants.find(v => v.id === selectedVariantId)
  const finalPrice   = product.price + (variant?.priceModifier || 0)
  const hasDiscount  = product.compareAtPrice && product.compareAtPrice > product.price
  const discount     = hasDiscount ? getDiscountPercent(product.price, product.compareAtPrice!) : 0
  const categoryLabel = CATEGORIES.find(c => c.value === product.category)?.label || product.category
  const displayImage = product.images[selectedImage] || getProductImageSrc(product.images)
  const outOfStock   = product.stock === 0

  function handleAddToCart() {
    setIsAdding(true)
    addItem(product, selectedVariantId, variant?.name)
    toast.success(`${product.name} dodano do koszyka!`)
    setTimeout(() => setIsAdding(false), 800)
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <nav className="text-xs text-gray-600 mb-8 flex items-center gap-2 font-mono">
          <Link href="/" className="hover:text-neon-cyan transition-colors">Główna</Link>
          <span className="text-gray-700">/</span>
          <Link href="/products" className="hover:text-neon-cyan transition-colors">Sklep</Link>
          <span className="text-gray-700">/</span>
          <span className="text-gray-400 truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── Galeria ── */}
          <div className="space-y-3">
            {/* Główne zdjęcie */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-dark-surface border border-dark-border group">
              <Image
                src={displayImage}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Neon corner accents */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-neon-cyan/30 pointer-events-none" />
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-neon-cyan/30 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-neon-cyan/20 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-neon-cyan/20 pointer-events-none" />

              {discount > 0 && (
                <span className="absolute top-4 right-4 bg-neon-red text-white text-sm font-bold px-3 py-1 rounded-full shadow-neon-red z-10">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Miniatury */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === i
                        ? 'border-neon-cyan shadow-neon-cyan-sm'
                        : 'border-dark-border hover:border-neon-cyan/40'
                    }`}
                  >
                    <Image src={img} alt={`Zdjęcie ${i + 1}`} fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Informacje ── */}
          <div>
            {/* Tagi */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map(tag => <Badge key={tag} tag={tag} />)}
            </div>

            {/* Kategoria */}
            <p className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-2">{categoryLabel}</p>

            {/* Nazwa */}
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-100 mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-base ${i < Math.round(product.rating!) ? 'text-yellow-400' : 'text-gray-700'}`}>★</span>
                  ))}
                </div>
                <span className="text-sm text-gray-400">{product.rating.toFixed(1)}</span>
                <span className="text-sm text-gray-600">({product.reviewCount} opinii)</span>
              </div>
            )}

            {/* Krótki opis */}
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{product.shortDescription}</p>

            {/* Cena */}
            <div className="flex items-end gap-4 mb-6 p-4 rounded-xl bg-dark-surface border border-dark-border">
              <div>
                <p className="text-xs text-gray-500 mb-1 font-mono uppercase tracking-wider">Cena</p>
                <p
                  className="font-mono text-4xl font-black text-neon-green"
                  style={{ textShadow: '0 0 30px rgba(0,255,136,0.5)' }}
                >
                  {formatPrice(finalPrice)}
                </p>
              </div>
              {hasDiscount && (
                <div>
                  <p className="text-xs text-gray-600 mb-1">Cena regularna</p>
                  <p className="font-mono text-lg text-gray-600 line-through">{formatPrice(product.compareAtPrice!)}</p>
                </div>
              )}
              {discount > 0 && (
                <span className="ml-auto px-3 py-1.5 rounded-lg bg-neon-red/10 border border-neon-red/30 text-neon-red text-sm font-bold">
                  Oszczędzasz {discount}%
                </span>
              )}
            </div>

            {/* Warianty */}
            {product.variants.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3 font-mono">
                  {product.variants[0].type === 'color' ? 'Kolor' : product.variants[0].type === 'size' ? 'Rozmiar' : 'Materiał'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantId(v.id)}
                      disabled={v.stock === 0}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 disabled:opacity-40 ${
                        selectedVariantId === v.id
                          ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan shadow-neon-cyan-sm'
                          : 'border-dark-border text-gray-400 hover:border-neon-cyan/40 hover:bg-neon-cyan/5'
                      }`}
                    >
                      {v.name}
                      {v.priceModifier !== 0 && (
                        <span className="ml-1 text-xs text-gray-500">
                          ({v.priceModifier > 0 ? '+' : ''}{formatPrice(v.priceModifier)})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Detale — siatka */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {product.material && (
                <div className="bg-dark-surface rounded-xl p-3 border border-dark-border text-center">
                  <p className="text-gray-600 text-[10px] uppercase tracking-wider font-mono mb-1">Materiał</p>
                  <p className="text-gray-200 font-semibold text-sm">{product.material}</p>
                </div>
              )}
              {product.printTime && (
                <div className="bg-dark-surface rounded-xl p-3 border border-dark-border text-center">
                  <p className="text-gray-600 text-[10px] uppercase tracking-wider font-mono mb-1">Czas druku</p>
                  <p className="text-gray-200 font-semibold text-sm">{product.printTime}h</p>
                </div>
              )}
              <div className="bg-dark-surface rounded-xl p-3 border border-dark-border text-center">
                <p className="text-gray-600 text-[10px] uppercase tracking-wider font-mono mb-1">Magazyn</p>
                <p className={`font-semibold text-sm ${outOfStock ? 'text-neon-red' : 'text-neon-green'}`}>
                  {outOfStock ? 'Brak' : `${product.stock} szt.`}
                </p>
              </div>
            </div>

            {/* Przycisk */}
            <Button
              fullWidth
              size="lg"
              isLoading={isAdding}
              disabled={outOfStock}
              onClick={handleAddToCart}
              className="btn-shine"
            >
              {outOfStock ? 'Brak w magazynie' : '🛒 Dodaj do koszyka'}
            </Button>

            {/* Info o zamówieniu indywidualnym */}
            <div className="mt-4 p-3 rounded-xl bg-neon-cyan/5 border border-neon-cyan/15 flex items-start gap-3">
              <span className="text-lg flex-shrink-0">🖨️</span>
              <div>
                <p className="text-xs font-semibold text-neon-cyan/80">Chcesz własny wariant?</p>
                <p className="text-xs text-gray-600 mt-0.5">
                  <Link href="/order" className="text-neon-cyan hover:underline">Zamów wydruk</Link>
                  {' '}z własnego pliku lub innym kolorem
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pełny opis */}
        <div className="mt-20 max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
              Opis produktu
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-neon-cyan/20 to-transparent" />
          </div>
          <div className="bg-dark-surface rounded-2xl border border-dark-border overflow-hidden">
            <div className="h-px bg-gradient-gaming opacity-20" />
            <div className="p-6 text-gray-400 text-sm leading-relaxed whitespace-pre-line">
              {product.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
