import { NextResponse } from 'next/server'
import { sql, initDB } from '@/lib/db'

export async function POST(request: Request) {
  const { imie, email, link_do_modelu, material, uwagi } = await request.json()

  try {
    await initDB()
    await sql`
      INSERT INTO orders (imie, email, model_url, material, uwagi)
      VALUES (${imie}, ${email}, ${link_do_modelu}, ${material}, ${uwagi || ''})
    `
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Order error:', error)
    return NextResponse.json({ error: 'Błąd zapisu' }, { status: 500 })
  }
}
