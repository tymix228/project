'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '@/types'
import { getProductImageSrc } from '@/lib/utils'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, variantId?: string, variantName?: string) => void
  removeItem: (productId: string, variantId?: string) => void
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, variantId, variantName) => {
        set(state => {
          const existingIndex = state.items.findIndex(
            item => item.productId === product.id && item.variantId === variantId
          )

          if (existingIndex >= 0) {
            // Zwiększ ilość jeśli już jest w koszyku
            const newItems = [...state.items]
            newItems[existingIndex] = {
              ...newItems[existingIndex],
              quantity: newItems[existingIndex].quantity + 1,
            }
            return { items: newItems }
          }

          // Oblicz cenę z uwzględnieniem wariantu
          let price = product.price
          if (variantId) {
            const variant = product.variants.find(v => v.id === variantId)
            if (variant) price += variant.priceModifier
          }

          const newItem: CartItem = {
            productId:       product.id,
            variantId,
            quantity:        1,
            priceSnapshot:   price,
            nameSnapshot:    product.name,
            imageSnapshot:   getProductImageSrc(product.images),
            variantSnapshot: variantName,
          }

          return { items: [...state.items, newItem] }
        })
      },

      removeItem: (productId, variantId) => {
        set(state => ({
          items: state.items.filter(
            item => !(item.productId === productId && item.variantId === variantId)
          ),
        }))
      },

      updateQuantity: (productId, quantity, variantId) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId)
          return
        }
        set(state => ({
          items: state.items.map(item =>
            item.productId === productId && item.variantId === variantId
              ? { ...item, quantity }
              : item
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + item.priceSnapshot * item.quantity,
          0
        )
      },
    }),
    {
      name: 'neonforge-cart',  // klucz w localStorage
    }
  )
)
