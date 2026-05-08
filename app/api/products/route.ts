import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { getProducts, createProduct } from '@/lib/products'
import { productFormSchema } from '@/lib/validations'
import { priceToCents } from '@/lib/utils'
import { revalidatePath } from 'next/cache'
import type { ProductCategory, ProductTag } from '@/types'

// GET /api/products — lista produktów z filtrami
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const result = await getProducts({
      category: searchParams.get('category') as ProductCategory | undefined,
      featured:  searchParams.get('featured') === 'true' ? true : undefined,
      tag:       searchParams.get('tag') as ProductTag | undefined,
      limit:     searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined,
      search:    searchParams.get('search') || undefined,
      sortBy:    (searchParams.get('sortBy') as 'price' | 'name' | 'createdAt' | 'rating') || undefined,
      order:     (searchParams.get('order') as 'asc' | 'desc') || undefined,
    })

    return NextResponse.json({ data: result.products, total: result.total })
  } catch (error) {
    console.error('GET /api/products error:', error)
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const cookieStore = cookies()
  if (cookieStore.get('admin_session')?.value !== 'ok') {
    return NextResponse.json({ error: 'Brak dostępu' }, { status: 401 })
  }

  try {
    const body = await request.json()

    // Walidacja danymi Zod
    const parsed = productFormSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Błąd walidacji', details: parsed.error.errors },
        { status: 400 }
      )
    }

    const data = parsed.data
    const product = await createProduct({
      name:             data.name,
      shortDescription: data.shortDescription,
      description:      data.description,
      price:            priceToCents(data.price),
      compareAtPrice:   data.compareAtPrice ? priceToCents(data.compareAtPrice) : undefined,
      category:         data.category,
      tags:             data.tags,
      material:         data.material,
      printTime:        data.printTime,
      stock:            data.stock,
      isActive:         data.isActive,
      isFeatured:       data.isFeatured,
      images:           body.images || [],
      variants:         body.variants || [],
    })

    revalidatePath('/products')
    revalidatePath('/admin/products')
    revalidatePath('/')

    return NextResponse.json(
      { data: product, message: 'Produkt dodany' },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/products error:', error)
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}
