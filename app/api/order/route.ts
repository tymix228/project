import { NextResponse } from 'next/server'
import { sql, initDB } from '@/lib/db'

export async function POST(request: Request) {
  const body = await request.json()

  await initDB()
  await sql`
    INSERT INTO orders (imie, email, model_url, material, uwagi)
    VALUES (${body.imie}, ${body.email}, ${body.link_do_modelu}, ${body.material}, ${body.uwagi || ''})
  `

  return NextResponse.json({ ok: true })
}
