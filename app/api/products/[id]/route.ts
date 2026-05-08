import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { getProductById, updateProduct, deleteProduct } from '@/lib/products'
import { revalidatePath } from 'next/cache'

function isAdmin() {
  const cookieStore = cookies()
  return cookieStore.get('admin_session')?.value === 'ok'
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await getProductById(params.id)
    if (!product) {
      return NextResponse.json({ error: 'Produkt nie znaleziony' }, { status: 404 })
    }
    return NextResponse.json({ data: product })
  } catch (error) {
    console.error('GET /api/products/[id] error:', error)
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdmin()) return NextResponse.json({ error: 'Brak dostępu' }, { status: 401 })

  try {
    const body = await request.json()
    const updated = await updateProduct(params.id, body)

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

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdmin()) return NextResponse.json({ error: 'Brak dostępu' }, { status: 401 })

  try {
    const success = await deleteProduct(params.id)
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
