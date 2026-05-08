import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')

  if (!token || token !== process.env.ADMIN_KEY) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  const response = NextResponse.redirect(new URL('/admin', request.url))
  response.cookies.set('admin_session', 'ok', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 dni
    path: '/',
  })
  return response
}
