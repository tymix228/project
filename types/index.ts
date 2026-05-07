// ============================================
// TYPY PRODUKTÓW
// ============================================

export type ProductCategory =
  | 'figurines'
  | 'accessories'
  | 'mods'
  | 'terrain'
  | 'cosplay'
  | 'electronics'

export type ProductTag =
  | 'bestseller'
  | 'new'
  | 'sale'
  | 'limited'
  | 'featured'

export interface ProductVariant {
  id: string
  name: string
  type: 'color' | 'size' | 'material'
  priceModifier: number  // +/- grosze od ceny bazowej
  stock: number
}

export interface ProductDimensions {
  width: number   // mm
  height: number  // mm
  depth: number   // mm
  weight: number  // gramy
}

export interface Product {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  price: number              // w groszach, np. 9900 = 99 PLN
  compareAtPrice?: number    // przekreślona cena przy sale
  category: ProductCategory
  tags: ProductTag[]
  images: string[]           // ścieżki: /images/products/xxx.jpg
  variants: ProductVariant[]
  dimensions?: ProductDimensions
  material?: string
  printTime?: number         // godziny druku 3D
  stock: number
  isActive: boolean
  isFeatured: boolean
  createdAt: string          // ISO string
  updatedAt: string
  rating?: number
  reviewCount?: number
}

export interface ProductsDB {
  products: Product[]
  lastUpdated: string
}

// ============================================
// TYPY KOSZYKA
// ============================================

export interface CartItem {
  productId: string
  variantId?: string
  quantity: number
  priceSnapshot: number    // cena zapisana w momencie dodania
  nameSnapshot: string
  imageSnapshot: string
  variantSnapshot?: string // nazwa wybranego wariantu
}

// ============================================
// TYPY FORMULARZY ADMINA
// ============================================

export interface AdminProductFormData {
  name: string
  shortDescription: string
  description: string
  price: number
  compareAtPrice?: number
  category: ProductCategory
  tags: ProductTag[]
  material?: string
  printTime?: number
  stock: number
  isActive: boolean
  isFeatured: boolean
}

// ============================================
// TYPY API
// ============================================

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
  total?: number
}

export interface ProductsQueryParams {
  category?: ProductCategory
  featured?: boolean
  tag?: ProductTag
  limit?: number
  search?: string
  sortBy?: 'price' | 'name' | 'createdAt' | 'rating'
  order?: 'asc' | 'desc'
}
