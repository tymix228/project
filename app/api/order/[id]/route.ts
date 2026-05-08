import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sql, initDB } from '@/lib/db'

function isAdmin() {
  const cookieStore = cookies()
  return cookieStore.get('admin_session')?.value === 'ok'
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Brak dostępu' }, { status: 401 })
  }

  try {
    const { status } = await request.json()
    const validStatuses = ['nowe', 'w_realizacji', 'zrealizowane']
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Nieprawidłowy status' }, { status: 400 })
    }

    await initDB()
    await sql`UPDATE orders SET status = ${status} WHERE id = ${params.id}`
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Brak dostępu' }, { status: 401 })
  }

  try {
    await initDB()
    await sql`DELETE FROM orders WHERE id = ${params.id}`
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
