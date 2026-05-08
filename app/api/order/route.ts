import { NextResponse } from 'next/server'
import { sql, initDB } from '@/lib/db'
import { Resend } from 'resend'

export async function POST(request: Request) {
  const body = await request.json()

  await initDB()
  await sql`
    INSERT INTO orders (imie, email, model_url, material, uwagi)
    VALUES (${body.imie}, ${body.email}, ${body.link_do_modelu}, ${body.material}, ${body.uwagi || ''})
  `

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'tymonbx@gmail.com',
      subject: `Nowe zamówienie od ${body.imie}`,
      html: `
        <h2>Nowe zamówienie wydruku 3D</h2>
        <p><b>Imię:</b> ${body.imie}</p>
        <p><b>Email:</b> ${body.email}</p>
        <p><b>Model:</b> <a href="${body.link_do_modelu}">${body.link_do_modelu}</a></p>
        <p><b>Materiał:</b> ${body.material}</p>
        <p><b>Uwagi:</b> ${body.uwagi || '—'}</p>
      `,
    })
  }

  return NextResponse.json({ ok: true })
}
