import { NextResponse } from 'next/server'
import { sql, initDB } from '@/lib/db'

export async function GET() {
  try {
    await initDB()
    const orders = await sql`SELECT COUNT(*) as count FROM orders`
    return NextResponse.json({ ok: true, count: orders[0].count })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    await initDB()
    await sql`
      INSERT INTO orders (imie, email, model_url, material, uwagi)
      VALUES (${body.imie}, ${body.email}, ${body.link_do_modelu}, ${body.material}, ${body.uwagi || ''})
    `

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Order save error:', e)
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
