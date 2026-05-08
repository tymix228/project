'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalPriceFormatted, isEmpty, clearCart } = useCart()

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center gap-6 px-4">
        <span className="text-7xl">🛒</span>
        <h1 className="font-display text-2xl font-bold gradient-text">Koszyk jest pusty</h1>
        <p className="text-gray-500 text-center">Dodaj produkty ze sklepu, aby kontynuować.</p>
        <Link href="/products">
          <Button size="lg">Przejdź do sklepu</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold gradient-text">Koszyk</h1>
          <button
            onClick={clearCart}
            className="text-xs text-gray-500 hover:text-neon-red transition-colors underline underline-offset-2"
          >
            Wyczyść koszyk
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Lista produktów */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div
                key={`${item.productId}-${item.variantId}`}
                className="flex gap-4 bg-dark-card border border-dark-border rounded-xl p-4"
              >
                {/* Zdjęcie */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-dark-surface">
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
                  <h3 className="font-semibold text-gray-100 text-sm leading-snug mb-1">
                    {item.nameSnapshot}
                  </h3>
                  {item.variantSnapshot && (
                    <p className="text-xs text-gray-500 mb-2">{item.variantSnapshot}</p>
                  )}
                  <p className="font-mono text-neon-green text-sm font-bold">
                    {formatPrice(item.priceSnapshot)}
                  </p>
                </div>

                {/* Ilość i usuń */}
                <div className="flex flex-col items-end justify-between gap-2">
                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    className="text-gray-600 hover:text-neon-red transition-colors text-xs"
                    aria-label="Usuń"
                  >
                    ✕
                  </button>

                  <div className="flex items-center gap-2 bg-dark-surface border border-dark-border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-neon-cyan transition-colors"
                    >
                      −
                    </button>
                    <span className="font-mono text-sm text-gray-200 w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-neon-cyan transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-mono text-xs text-gray-400">
                    {formatPrice(item.priceSnapshot * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Podsumowanie */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-dark-card border border-dark-border rounded-xl p-6">
              <h2 className="font-display font-bold text-gray-200 mb-5">Podsumowanie</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Produkty ({items.reduce((s, i) => s + i.quantity, 0)} szt.)</span>
                  <span className="font-mono">{totalPriceFormatted}</span>
                </div>
                <div className="border-t border-dark-border pt-3 flex justify-between font-bold">
                  <span className="text-gray-200">Razem</span>
                  <span className="font-mono text-neon-green text-lg">{totalPriceFormatted}</span>
                </div>
              </div>

              {/* Info o płatnościach */}
              <div className="bg-neon-cyan/5 border border-neon-cyan/20 rounded-lg p-4 mb-4">
                <p className="text-neon-cyan text-xs font-semibold mb-1">Sklep w budowie</p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Płatności online będą dostępne wkrótce. Aby złożyć zamówienie — skontaktuj się z nami bezpośrednio.
                </p>
              </div>

              <Link href="/products" className="block mb-3">
                <Button fullWidth variant="secondary" size="md">
                  Kontynuuj zakupy
                </Button>
              </Link>

              <div className="border-t border-dark-border pt-4">
                <p className="text-xs text-gray-600 mb-2 text-center">Lub zamów wydruk własnego modelu</p>
                <Link href="/order" className="block">
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
