import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import type { Product, ProductsDB, ProductsQueryParams } from '@/types'
import { generateId, generateSlug } from './utils'

const DB_PATH = path.join(process.cwd(), 'data', 'products.json')

// Odczyt całej bazy danych
function readDB(): ProductsDB {
  const raw = readFileSync(DB_PATH, 'utf-8')
  return JSON.parse(raw) as ProductsDB
}

// Zapis całej bazy danych
function writeDB(db: ProductsDB): void {
  db.lastUpdated = new Date().toISOString()
  writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8')
}

// Pobierz wszystkie produkty z opcjonalnym filtrowaniem
export function getProducts(params?: ProductsQueryParams): { products: Product[]; total: number } {
  const db = readDB()
  let products = [...db.products]

  // Filtruj tylko aktywne (dla sklepu)
  if (params?.category) {
    products = products.filter(p => p.category === params.category)
  }

  if (params?.featured) {
    products = products.filter(p => p.isFeatured)
  }

  if (params?.tag) {
    products = products.filter(p => p.tags.includes(params.tag!))
  }

  if (params?.search) {
    const q = params.search.toLowerCase()
    products = products.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
    )
  }

  // Sortowanie
  const sortBy = params?.sortBy || 'createdAt'
  const order  = params?.order || 'desc'
  products.sort((a, b) => {
    let aVal: number | string = a[sortBy as keyof Product] as number | string
    let bVal: number | string = b[sortBy as keyof Product] as number | string
    if (aVal === undefined) aVal = 0
    if (bVal === undefined) bVal = 0
    if (order === 'asc') return aVal > bVal ? 1 : -1
    return aVal < bVal ? 1 : -1
  })

  const total = products.length

  if (params?.limit) {
    products = products.slice(0, params.limit)
  }

  return { products, total }
}

// Pobierz aktywne produkty (tylko dla sklepu publicznego)
export function getActiveProducts(params?: ProductsQueryParams): { products: Product[]; total: number } {
  return getProducts({ ...params })
}

// Pobierz produkt po slug
export function getProductBySlug(slug: string): Product | null {
  const db = readDB()
  return db.products.find(p => p.slug === slug) ?? null
}

// Pobierz produkt po ID
export function getProductById(id: string): Product | null {
  const db = readDB()
  return db.products.find(p => p.id === id) ?? null
}

// Dodaj nowy produkt
export function createProduct(data: Omit<Product, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): Product {
  const db = readDB()

  const slug = generateSlug(data.name)
  // Zapewnij unikalność slug
  const existingSlugs = db.products.map(p => p.slug)
  let finalSlug = slug
  let counter = 1
  while (existingSlugs.includes(finalSlug)) {
    finalSlug = `${slug}-${counter++}`
  }

  const newProduct: Product = {
    ...data,
    id: generateId(),
    slug: finalSlug,
    images: data.images || [],
    variants: data.variants || [],
    tags: data.tags || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  db.products.unshift(newProduct) // dodaj na początku (najnowsze pierwsze)
  writeDB(db)
  return newProduct
}

// Zaktualizuj produkt
export function updateProduct(id: string, data: Partial<Product>): Product | null {
  const db = readDB()
  const index = db.products.findIndex(p => p.id === id)
  if (index === -1) return null

  // Jeśli zmieniono nazwę, zaktualizuj slug
  if (data.name && data.name !== db.products[index].name) {
    data.slug = generateSlug(data.name)
  }

  db.products[index] = {
    ...db.products[index],
    ...data,
    id,  // id nigdy się nie zmienia
    updatedAt: new Date().toISOString(),
  }

  writeDB(db)
  return db.products[index]
}

// Usuń produkt
export function deleteProduct(id: string): boolean {
  const db = readDB()
  const index = db.products.findIndex(p => p.id === id)
  if (index === -1) return false

  db.products.splice(index, 1)
  writeDB(db)
  return true
}

// Statystyki dla dashboardu admina
export function getStats() {
  const db = readDB()
  const products = db.products

  return {
    total: products.length,
    active: products.filter(p => p.isActive).length,
    featured: products.filter(p => p.isFeatured).length,
    outOfStock: products.filter(p => p.stock === 0).length,
    byCategory: Object.fromEntries(
      ['figurines', 'accessories', 'mods', 'terrain', 'cosplay', 'electronics'].map(cat => [
        cat,
        products.filter(p => p.category === cat).length,
      ])
    ),
  }
}
