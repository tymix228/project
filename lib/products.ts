import type { Product, ProductsQueryParams } from '@/types'
import { generateId, generateSlug } from './utils'
import { sql, initDB } from './db'

type Row = Record<string, unknown>

function toProduct(r: Row): Product {
  return {
    id:               r.id               as string,
    slug:             r.slug             as string,
    name:             r.name             as string,
    shortDescription: r.short_description as string,
    description:      r.description      as string,
    price:            r.price            as number,
    compareAtPrice:   r.compare_at_price  as number | undefined,
    category:         r.category         as Product['category'],
    tags:             (r.tags            as Product['tags'])    ?? [],
    images:           (r.images          as string[])           ?? [],
    variants:         (r.variants        as Product['variants']) ?? [],
    material:         r.material         as string | undefined,
    printTime:        r.print_time       as number | undefined,
    stock:            r.stock            as number,
    isActive:         r.is_active        as boolean,
    isFeatured:       r.is_featured      as boolean,
    createdAt:        (r.created_at as Date).toISOString(),
    updatedAt:        (r.updated_at as Date).toISOString(),
    rating:           r.rating           as number | undefined,
    reviewCount:      r.review_count     as number,
  }
}

export async function getProducts(
  params?: ProductsQueryParams
): Promise<{ products: Product[]; total: number }> {
  await initDB()
  const rows = await sql`SELECT * FROM products ORDER BY created_at DESC`
  let products = rows.map(toProduct)

  if (params?.category) products = products.filter(p => p.category === params.category)
  if (params?.featured)  products = products.filter(p => p.isFeatured)
  if (params?.tag)       products = products.filter(p => p.tags.includes(params.tag!))
  if (params?.search) {
    const q = params.search.toLowerCase()
    products = products.filter(
      p => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q)
    )
  }

  const sortBy = params?.sortBy || 'createdAt'
  const order  = params?.order  || 'desc'
  products.sort((a, b) => {
    const aVal = (a[sortBy as keyof Product] as number | string) ?? 0
    const bVal = (b[sortBy as keyof Product] as number | string) ?? 0
    if (order === 'asc') return aVal > bVal ? 1 : -1
    return aVal < bVal ? 1 : -1
  })

  const total = products.length
  if (params?.limit) products = products.slice(0, params.limit)
  return { products, total }
}

export async function getActiveProducts(params?: ProductsQueryParams) {
  return getProducts(params)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await initDB()
  const rows = await sql`SELECT * FROM products WHERE slug = ${slug} LIMIT 1`
  return rows[0] ? toProduct(rows[0] as Row) : null
}

export async function getProductById(id: string): Promise<Product | null> {
  await initDB()
  const rows = await sql`SELECT * FROM products WHERE id = ${id} LIMIT 1`
  return rows[0] ? toProduct(rows[0] as Row) : null
}

export async function createProduct(
  data: Omit<Product, 'id' | 'slug' | 'createdAt' | 'updatedAt'>
): Promise<Product> {
  await initDB()

  const baseSlug = generateSlug(data.name)
  const existing = await sql`SELECT slug FROM products WHERE slug LIKE ${baseSlug + '%'}`
  const usedSlugs = existing.map(r => r.slug as string)
  let slug = baseSlug
  let i = 1
  while (usedSlugs.includes(slug)) slug = `${baseSlug}-${i++}`

  const id = generateId()
  const rows = await sql`
    INSERT INTO products (
      id, slug, name, short_description, description,
      price, compare_at_price, category, tags, images, variants,
      material, print_time, stock, is_active, is_featured,
      rating, review_count
    ) VALUES (
      ${id}, ${slug}, ${data.name}, ${data.shortDescription}, ${data.description},
      ${data.price}, ${data.compareAtPrice ?? null}, ${data.category},
      ${JSON.stringify(data.tags)}, ${JSON.stringify(data.images)}, ${JSON.stringify(data.variants)},
      ${data.material ?? null}, ${data.printTime ?? null}, ${data.stock},
      ${data.isActive}, ${data.isFeatured},
      ${data.rating ?? null}, ${data.reviewCount ?? 0}
    )
    RETURNING *
  `
  return toProduct(rows[0] as Row)
}

export async function updateProduct(
  id: string,
  data: Partial<Product>
): Promise<Product | null> {
  await initDB()

  const existing = await sql`SELECT * FROM products WHERE id = ${id} LIMIT 1`
  if (!existing[0]) return null

  const current = toProduct(existing[0] as Row)
  const merged  = { ...current, ...data, id }

  const newSlug = data.name && data.name !== current.name
    ? generateSlug(data.name)
    : current.slug

  const rows = await sql`
    UPDATE products SET
      slug              = ${newSlug},
      name              = ${merged.name},
      short_description = ${merged.shortDescription},
      description       = ${merged.description},
      price             = ${merged.price},
      compare_at_price  = ${merged.compareAtPrice ?? null},
      category          = ${merged.category},
      tags              = ${JSON.stringify(merged.tags)},
      images            = ${JSON.stringify(merged.images)},
      variants          = ${JSON.stringify(merged.variants)},
      material          = ${merged.material ?? null},
      print_time        = ${merged.printTime ?? null},
      stock             = ${merged.stock},
      is_active         = ${merged.isActive},
      is_featured       = ${merged.isFeatured},
      rating            = ${merged.rating ?? null},
      review_count      = ${merged.reviewCount ?? 0},
      updated_at        = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return rows[0] ? toProduct(rows[0] as Row) : null
}

export async function deleteProduct(id: string): Promise<boolean> {
  await initDB()
  const result = await sql`DELETE FROM products WHERE id = ${id}`
  return (result as unknown as { rowCount: number }).rowCount > 0
}

export async function getStats() {
  await initDB()
  const rows = await sql`SELECT * FROM products`
  const products = rows.map(toProduct)

  return {
    total:      products.length,
    active:     products.filter(p => p.isActive).length,
    featured:   products.filter(p => p.isFeatured).length,
    outOfStock: products.filter(p => p.stock === 0).length,
    byCategory: Object.fromEntries(
      ['figurines', 'accessories', 'mods', 'terrain', 'cosplay', 'electronics'].map(cat => [
        cat,
        products.filter(p => p.category === cat).length,
      ])
    ),
  }
}
