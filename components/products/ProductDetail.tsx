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
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id || undefined
  )
  const [selectedImage, setSelectedImage] = useState(0)
  const [isAdding, setIsAdding] = useState(false)

  const variant = product.variants.find(v => v.id === selectedVariantId)
  const finalPrice = product.price + (variant?.priceModifier || 0)
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price
  const discount = hasDiscount ? getDiscountPercent(product.price, product.compareAtPrice!) : 0
  const categoryLabel = CATEGORIES.find(c => c.value === product.category)?.label || product.category
  const displayImage = product.images[selectedImage] || getProductImageSrc(product.images)

  function handleAddToCart() {
    setIsAdding(true)
    addItem(product, selectedVariantId, variant?.name)
    toast.success(`${product.name} dodano do koszyka!`)
    setTimeout(() => setIsAdding(false), 800)
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-neon-cyan transition-colors">Główna</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-neon-cyan transition-colors">Sklep</Link>
          <span>/</span>
          <span className="text-gray-300">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Galeria */}
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-dark-surface border border-dark-border mb-3">
              <Image
                src={displayImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {discount > 0 && (
                <span className="absolute top-4 right-4 bg-neon-red text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{discount}%
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-neon-cyan' : 'border-dark-border hover:border-neon-cyan/50'
                    }`}
                  >
                    <Image src={img} alt={`Zdjęcie ${i + 1}`} fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informacje */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map(tag => <Badge key={tag} tag={tag} />)}
            </div>

            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{categoryLabel}</p>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-100 mb-2">{product.name}</h1>

            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400 text-sm">
                  {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
                </div>
                <span className="text-sm text-gray-400">{product.rating.toFixed(1)} ({product.reviewCount} opinii)</span>
              </div>
            )}

            <p className="text-gray-400 text-sm leading-relaxed mb-6">{product.shortDescription}</p>

            {/* Cena */}
            <div className="flex items-end gap-3 mb-6">
              <p className="font-mono text-3xl font-bold text-neon-green">{formatPrice(finalPrice)}</p>
              {hasDiscount && (
                <p className="font-mono text-lg text-gray-500 line-through mb-0.5">
                  {formatPrice(product.compareAtPrice!)}
                </p>
              )}
            </div>

            {/* Warianty */}
            {product.variants.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  {product.variants[0].type === 'color' ? 'Kolor' : product.variants[0].type === 'size' ? 'Rozmiar' : 'Materiał'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantId(v.id)}
                      disabled={v.stock === 0}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 disabled:opacity-40 ${
                        selectedVariantId === v.id
                          ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan'
                          : 'border-dark-border text-gray-400 hover:border-neon-cyan/40'
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

            {/* Detale */}
            <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
              {product.material && (
                <div className="bg-dark-surface rounded-lg p-3 border border-dark-border">
                  <p className="text-gray-500 text-xs mb-1">Materiał</p>
                  <p className="text-gray-200 font-medium">{product.material}</p>
                </div>
              )}
              {product.printTime && (
                <div className="bg-dark-surface rounded-lg p-3 border border-dark-border">
                  <p className="text-gray-500 text-xs mb-1">Czas druku</p>
                  <p className="text-gray-200 font-medium">{product.printTime}h</p>
                </div>
              )}
              <div className="bg-dark-surface rounded-lg p-3 border border-dark-border">
                <p className="text-gray-500 text-xs mb-1">Stan magazynowy</p>
                <p className={`font-medium ${product.stock > 0 ? 'text-neon-green' : 'text-neon-red'}`}>
                  {product.stock > 0 ? `${product.stock} szt.` : 'Brak'}
                </p>
              </div>
            </div>

            <Button fullWidth size="lg" isLoading={isAdding} disabled={product.stock === 0} onClick={handleAddToCart}>
              {product.stock === 0 ? 'Brak w magazynie' : '🛒 Dodaj do koszyka'}
            </Button>
          </div>
        </div>

        {/* Opis */}
        <div className="mt-16 max-w-3xl">
          <h2 className="font-display text-xl font-bold text-gray-200 mb-6 pb-3 border-b border-dark-border">
            Opis produktu
          </h2>
          <div className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
            {product.description}
          </div>
        </div>
      </div>
    </div>
  )
}
