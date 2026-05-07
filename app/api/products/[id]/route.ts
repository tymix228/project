import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getProductById, updateProduct, deleteProduct } from '@/lib/products'
import { revalidatePath } from 'next/cache'

import { ADMIN_COOKIE_NAME } from '@/lib/constants'

// Akceptuje klucz w headerze (do testów API) LUB sesję cookie (panel admina)
function isAuthorized(request: NextRequest): boolean {
  const headerKey = request.headers.get('x-admin-key')
  if (headerKey === process.env.ADMIN_KEY) return true
  const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)
  return sessionCookie?.value === 'authenticated'
}

// GET /api/products/[id] — jeden produkt
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = getProductById(params.id)
    if (!product) {
      return NextResponse.json({ error: 'Produkt nie znaleziony' }, { status: 404 })
    }
    return NextResponse.json({ data: product })
  } catch (error) {
    console.error('GET /api/products/[id] error:', error)
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}

// PUT /api/products/[id] — zaktualizuj produkt
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Brak uprawnień' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const updated = updateProduct(params.id, body)

    if (!updated) {
      return NextResponse.json({ error: 'Produkt nie znaleziony' }, { status: 404 })
    }

    revalidatePath('/products')
    revalidatePath(`/products/${updated.slug}`)
    revalidatePath('/admin/products')
    revalidatePath('/')

    return NextResponse.json({ data: updated, message: 'Zaktualizowano' })
  } catch (error) {
    console.error('PUT /api/products/[id] error:', error)
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}

// DELETE /api/products/[id] — usuń produkt
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Brak uprawnień' }, { status: 401 })
  }

  try {
    const success = deleteProduct(params.id)
    if (!success) {
      return NextResponse.json({ error: 'Produkt nie znaleziony' }, { status: 404 })
    }

    revalidatePath('/products')
    revalidatePath('/admin/products')
    revalidatePath('/')

    return NextResponse.json({ message: 'Produkt usunięty' })
  } catch (error) {
    console.error('DELETE /api/products/[id] error:', error)
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}
