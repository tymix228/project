import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CURRENCY_SYMBOL } from './constants'

// Łączenie klas Tailwind bez konfliktów
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formatowanie ceny z groszy na PLN
export function formatPrice(priceInCents: number): string {
  const price = priceInCents / 100
  return `${price.toFixed(2)} ${CURRENCY_SYMBOL}`
}

// Formatowanie ceny jako liczba (dla obliczeń)
export function priceToNumber(priceInCents: number): number {
  return priceInCents / 100
}

// Konwersja PLN na grosze (dla formularzy)
export function priceToCents(pricePLN: number): number {
  return Math.round(pricePLN * 100)
}

// Generowanie slug z nazwy (URL-friendly)
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // usuń znaki diakrytyczne
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// Generowanie prostego ID (nie wymaga uuid przy SSR)
export function generateId(): string {
  return `prod_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

// Skrócenie tekstu do określonej długości
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '...'
}

// Obliczanie % zniżki
export function getDiscountPercent(price: number, compareAtPrice: number): number {
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
}

// Formatowanie daty
export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Sprawdzenie czy produkt jest dostępny
export function isInStock(stock: number): boolean {
  return stock > 0
}

// Placeholder gdy brak zdjęcia
export function getProductImageSrc(images: string[]): string {
  if (images && images.length > 0 && images[0]) return images[0]
  return '/images/placeholder.svg'
}
