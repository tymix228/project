import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { imie, email, link_do_modelu, material, uwagi } = await request.json()

  try {
    await resend.emails.send({
      from:    'NeonForge Store <onboarding@resend.dev>',
      to:      'tymonbx@gmail.com',
      replyTo: email,
      subject: `🖨️ Nowe zamówienie od ${imie}`,
      html: `
        <h2 style="color:#00b4d8">Nowe zamówienie wydruku 3D</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
          <tr style="background:#f5f5f5">
            <td style="padding:10px;border:1px solid #ddd;font-weight:bold">Imię</td>
            <td style="padding:10px;border:1px solid #ddd">${imie}</td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #ddd;font-weight:bold">E-mail klienta</td>
            <td style="padding:10px;border:1px solid #ddd"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr style="background:#f5f5f5">
            <td style="padding:10px;border:1px solid #ddd;font-weight:bold">Link do modelu</td>
            <td style="padding:10px;border:1px solid #ddd"><a href="${link_do_modelu}">${link_do_modelu}</a></td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #ddd;font-weight:bold">Materiał</td>
            <td style="padding:10px;border:1px solid #ddd">${material}</td>
          </tr>
          <tr style="background:#f5f5f5">
            <td style="padding:10px;border:1px solid #ddd;font-weight:bold">Uwagi</td>
            <td style="padding:10px;border:1px solid #ddd">${uwagi || '—'}</td>
          </tr>
        </table>
        <p style="margin-top:16px;color:#666">Kliknij <b>Odpowiedz</b> — mail trafi do klienta.</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Mail error:', error)
    return NextResponse.json({ error: 'Błąd wysyłania' }, { status: 500 })
  }
}
