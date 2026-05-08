import { NextResponse } from 'next/server'
import { sql, initDB } from '@/lib/db'

export async function POST(request: Request) {
  const body = await request.json()

  await initDB()
  await sql`
    INSERT INTO orders (imie, email, model_url, material, uwagi)
    VALUES (${body.imie}, ${body.email}, ${body.link_do_modelu}, ${body.material}, ${body.uwagi || ''})
  `

  try {
    const form = new URLSearchParams()
    form.append('imie', body.imie)
    form.append('email', body.email)
    form.append('link_do_modelu', body.link_do_modelu)
    form.append('material', body.material)
    form.append('uwagi', body.uwagi || '')
    form.append('_subject', `Nowe zamówienie od ${body.imie}`)
    form.append('_captcha', 'false')

    await fetch('https://formsubmit.co/tymonbx@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
    })
  } catch (_) {}

  return NextResponse.json({ ok: true })
}
