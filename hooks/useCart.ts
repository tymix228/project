'use client'

import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'

export function useCart() {
  const store = useCartStore()

  return {
    items:           store.items,
    addItem:         store.addItem,
    removeItem:      store.removeItem,
    updateQuantity:  store.updateQuantity,
    clearCart:       store.clearCart,
    totalItems:      store.getTotalItems(),
    totalPrice:      store.getTotalPrice(),
    totalPriceFormatted: formatPrice(store.getTotalPrice()),
    isEmpty:         store.items.length === 0,
  }
}
