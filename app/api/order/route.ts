import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const body = await request.json()
  const { imie, email, link_do_modelu, material, uwagi } = body

  try {
    await resend.emails.send({
      from:    'Zamówienia NeonForge <onboarding@resend.dev>',
      to:      'tymonbx@gmail.com',
      replyTo: email,
      subject: `Nowe zamówienie od ${imie}`,
      html: `
        <h2>Nowe zamówienie wydruku 3D</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #ddd"><b>Imię</b></td><td style="padding:8px;border:1px solid #ddd">${imie}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><b>E-mail klienta</b></td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><b>Link do modelu</b></td><td style="padding:8px;border:1px solid #ddd"><a href="${link_do_modelu}">${link_do_modelu}</a></td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><b>Materiał</b></td><td style="padding:8px;border:1px solid #ddd">${material}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><b>Uwagi</b></td><td style="padding:8px;border:1px solid #ddd">${uwagi || '—'}</td></tr>
        </table>
        <p>Odpowiedz bezpośrednio na tego maila — trafi do klienta.</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Błąd wysyłania' }, { status: 500 })
  }
}
