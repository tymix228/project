import type { ProductCategory, ProductTag } from '@/types'

export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'NeonForge Store'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
export const CURRENCY = 'PLN'
export const CURRENCY_SYMBOL = 'zł'

export const CATEGORIES: { value: ProductCategory; label: string; icon: string }[] = [
  { value: 'figurines',    label: 'Figurki',        icon: '🏆' },
  { value: 'accessories',  label: 'Akcesoria',      icon: '🎮' },
  { value: 'mods',         label: 'Mody',           icon: '⚙️' },
  { value: 'terrain',      label: 'Teren RPG',      icon: '🗺️' },
  { value: 'cosplay',      label: 'Cosplay',        icon: '🦾' },
  { value: 'electronics',  label: 'Elektronika',    icon: '💡' },
]

export const TAGS: { value: ProductTag; label: string; color: string }[] = [
  { value: 'bestseller', label: 'Bestseller', color: 'neon-gold' },
  { value: 'new',        label: 'Nowość',     color: 'neon-cyan' },
  { value: 'sale',       label: 'Promocja',   color: 'neon-red' },
  { value: 'limited',    label: 'Limitowana', color: 'neon-purple' },
  { value: 'featured',   label: 'Polecana',   color: 'neon-green' },
]

export const SORT_OPTIONS = [
  { value: 'createdAt-desc', label: 'Najnowsze' },
  { value: 'price-asc',      label: 'Cena: rosnąco' },
  { value: 'price-desc',     label: 'Cena: malejąco' },
  { value: 'name-asc',       label: 'Nazwa: A-Z' },
  { value: 'rating-desc',    label: 'Ocena' },
]

export const MAX_UPLOAD_SIZE = 5 * 1024 * 1024  // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const PRODUCTS_PER_PAGE = 12
export const FEATURED_PRODUCTS_COUNT = 4
export const ADMIN_COOKIE_NAME = 'admin_session'
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 8  // 8 godzin
