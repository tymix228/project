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
          <Link href="/" className="hover:text-neon-cyan transition-colors duration-150">Główna</Link>
          <span className="text-gray-800">◂</span>
          <Link href="/products" className="hover:text-neon-cyan transition-colors duration-150">Sklep</Link>
          <span className="text-gray-800">◂</span>
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
                <span className="absolute top-4 left-4 bg-neon-red text-white text-sm font-bold px-3 py-1 rounded-full shadow-neon-red z-10">
                  -{discount}%
                </span>
              )}

              {/* Image navigation arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(i => (i - 1 + product.images.length) % product.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-dark-bg/80 border border-dark-border text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/40 flex items-center justify-center backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
                    aria-label="Poprzednie zdjęcie"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedImage(i => (i + 1) % product.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-dark-bg/80 border border-dark-border text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/40 flex items-center justify-center backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
                    aria-label="Następne zdjęcie"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  {/* Dot indicators */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {product.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                          selectedImage === i ? 'bg-neon-cyan w-4' : 'bg-gray-600 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </>
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
            <div className="mb-6 rounded-xl overflow-hidden bg-dark-surface border border-dark-border">
              <div className="h-px bg-gradient-gaming opacity-40" />
              <div className="flex items-end gap-4 p-4">
                <div>
                  <p className="text-[10px] text-gray-600 mb-1 font-mono uppercase tracking-widest">Cena</p>
                  <p
                    className="font-mono text-4xl font-black text-neon-green"
                    style={{ textShadow: '0 0 30px rgba(0,255,136,0.5)' }}
                  >
                    {formatPrice(finalPrice)}
                  </p>
                </div>
                {hasDiscount && (
                  <div>
                    <p className="text-[10px] text-gray-600 mb-1 font-mono">Cena regularna</p>
                    <p className="font-mono text-lg text-gray-600 line-through">{formatPrice(product.compareAtPrice!)}</p>
                  </div>
                )}
                {discount > 0 && (
                  <span className="ml-auto px-3 py-1.5 rounded-lg bg-neon-red/10 border border-neon-red/30 text-neon-red text-sm font-bold">
                    -{discount}%
                  </span>
                )}
              </div>
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
                <div className="group bg-dark-surface rounded-xl p-3 border border-dark-border text-center hover:border-neon-cyan/30 transition-colors duration-200 overflow-hidden relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 bg-neon-cyan rounded-full transition-all duration-400 opacity-50" />
                  <p className="text-gray-600 text-[10px] uppercase tracking-wider font-mono mb-1">Materiał</p>
                  <p className="text-neon-cyan font-mono font-bold text-sm">{product.material}</p>
                </div>
              )}
              {product.printTime && (
                <div className="group bg-dark-surface rounded-xl p-3 border border-dark-border text-center hover:border-neon-purple/30 transition-colors duration-200 overflow-hidden relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 bg-neon-purple rounded-full transition-all duration-400 opacity-50" />
                  <p className="text-gray-600 text-[10px] uppercase tracking-wider font-mono mb-1">Czas druku</p>
                  <p className="text-gray-200 font-mono font-bold text-sm">{product.printTime}h</p>
                </div>
              )}
              <div className="group bg-dark-surface rounded-xl p-3 border border-dark-border text-center overflow-hidden relative"
                style={{ borderColor: outOfStock ? 'rgba(255,0,68,0.2)' : 'rgba(0,255,136,0.2)' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-1/2 rounded-full"
                  style={{ background: outOfStock ? '#FF0044' : '#00FF88', opacity: 0.4 }} />
                <p className="text-gray-600 text-[10px] uppercase tracking-wider font-mono mb-1">Magazyn</p>
                <p className={`font-mono font-bold text-sm ${outOfStock ? 'text-neon-red' : 'text-neon-green'}`}>
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
            <div className="mt-4 rounded-xl overflow-hidden">
              <div className="h-px bg-gradient-to-r from-neon-cyan/40 via-neon-purple/40 to-transparent" />
              <div className="p-3 bg-neon-cyan/4 border border-x border-b border-neon-cyan/10 rounded-b-xl flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center flex-shrink-0 text-base">
                  🖨️
                </div>
                <div>
                  <p className="text-xs font-bold text-neon-cyan/80 font-mono uppercase tracking-wider mb-0.5">Własny wariant?</p>
                  <p className="text-xs text-gray-600">
                    <Link href="/order" className="text-neon-cyan hover:underline font-medium">Zamów wydruk</Link>
                    {' '}ze swojego pliku STL lub w innym kolorze
                  </p>
                </div>
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
