'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPriceFormatted, isEmpty, clearCart } = useCart()

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center gap-6 px-4 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-neon-cyan/4 blur-[100px]" />

        <div className="relative text-center">
          <div
            className="w-28 h-28 rounded-3xl bg-dark-surface border border-dark-border flex items-center justify-center mx-auto mb-6 text-6xl float-animation"
            style={{ boxShadow: '0 0 40px rgba(0,245,255,0.08)' }}
          >
            🛒
          </div>
          <h1 className="font-display text-3xl font-bold gradient-text mb-3">Koszyk jest pusty</h1>
          <p className="text-gray-500 text-center max-w-xs mb-8">
            Dodaj produkty ze sklepu lub zamów własny wydruk 3D.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/products">
              <Button size="lg">Przejdź do sklepu</Button>
            </Link>
            <Link href="/order">
              <Button size="lg" variant="secondary">Zamów wydruk</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg py-10 relative">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Nagłówek */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan text-xs font-mono mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
              KOSZYK
            </div>
            <h1 className="font-display text-3xl font-bold gradient-text">Mój koszyk</h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-gray-600 hover:text-neon-red transition-colors duration-200 underline underline-offset-2 font-mono"
          >
            Wyczyść wszystko
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Lista produktów */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item, i) => (
              <div
                key={`${item.productId}-${item.variantId}`}
                className="group flex gap-4 bg-dark-surface border border-dark-border rounded-2xl p-4 hover:border-neon-cyan/20 transition-all duration-300 relative overflow-hidden animate-slide-up"
                style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
              >
                {/* Left accent */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 group-hover:h-3/4 bg-gradient-gaming transition-all duration-500 rounded-r-full" />

                {/* Zdjęcie */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-dark-bg border border-dark-border">
                  <Image
                    src={item.imageSnapshot}
                    alt={item.nameSnapshot}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-100 text-sm leading-snug mb-0.5 line-clamp-2 group-hover:text-neon-cyan transition-colors duration-200">
                    {item.nameSnapshot}
                  </h3>
                  {item.variantSnapshot && (
                    <p className="text-xs text-gray-600 mb-2 font-mono">{item.variantSnapshot}</p>
                  )}
                  <p className="font-mono font-bold text-neon-green text-sm" style={{ textShadow: '0 0 10px rgba(0,255,136,0.3)' }}>
                    {formatPrice(item.priceSnapshot)}
                  </p>
                </div>

                {/* Sterowanie */}
                <div className="flex flex-col items-end justify-between gap-2">
                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-600 hover:text-neon-red hover:bg-neon-red/10 border border-transparent hover:border-neon-red/30 transition-all duration-200 text-xs"
                    aria-label="Usuń"
                  >
                    ✕
                  </button>

                  {/* Ilość */}
                  <div className="flex items-center bg-dark-bg border border-dark-border rounded-xl overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                      className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:bg-neon-cyan/5 transition-all duration-150 text-base"
                    >
                      −
                    </button>
                    <span className="font-mono text-sm text-gray-200 w-8 text-center select-none">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                      className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:bg-neon-cyan/5 transition-all duration-150 text-base"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-mono text-xs text-gray-500">
                    = {formatPrice(item.priceSnapshot * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Podsumowanie */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-dark-surface border border-dark-border rounded-2xl overflow-hidden">
              {/* Gradient top line */}
              <div className="h-px bg-gradient-gaming opacity-60" />
              {/* Header */}
              <div className="px-6 py-4 border-b border-dark-border bg-gradient-to-r from-neon-cyan/5 to-neon-purple/5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-gradient-gaming rounded-full" />
                  <h2 className="font-display font-bold text-gray-200 text-sm uppercase tracking-wider">
                    Podsumowanie
                  </h2>
                </div>
              </div>

              <div className="p-6">
                {/* Pozycje */}
                <div className="space-y-3 mb-5">
                  {items.map(item => (
                    <div key={`${item.productId}-${item.variantId}`} className="flex justify-between text-xs text-gray-500">
                      <span className="truncate max-w-[160px]">{item.nameSnapshot} ×{item.quantity}</span>
                      <span className="font-mono flex-shrink-0 ml-2">{formatPrice(item.priceSnapshot * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="border-t border-dark-border pt-4 mb-5">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-semibold text-gray-300">Razem</span>
                    <span
                      className="font-mono font-black text-2xl text-neon-green"
                      style={{ textShadow: '0 0 20px rgba(0,255,136,0.4)' }}
                    >
                      {totalPriceFormatted}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Łącznie {items.reduce((s,i) => s + i.quantity, 0)} szt.</p>
                </div>

                {/* Info */}
                <div className="p-4 rounded-xl bg-neon-cyan/5 border border-neon-cyan/15 mb-4">
                  <div className="flex items-start gap-2">
                    <span className="text-neon-cyan text-sm">ℹ</span>
                    <div>
                      <p className="text-neon-cyan/80 text-xs font-semibold mb-0.5">Sklep w budowie</p>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        Płatności online wkrótce. Aby kupić — skontaktuj się bezpośrednio.
                      </p>
                    </div>
                  </div>
                </div>

                <Link href="/products" className="block mb-3">
                  <Button fullWidth variant="secondary">← Kontynuuj zakupy</Button>
                </Link>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-dark-border" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-dark-surface px-3 text-xs text-gray-600">lub</span>
                  </div>
                </div>

                <Link href="/order" className="block mt-3">
                  <Button fullWidth variant="ghost" size="sm">
                    Zamów własny wydruk →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
