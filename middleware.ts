import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ADMIN_COOKIE_NAME } from './lib/constants'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Strona logowania jest zawsze dostępna
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  // Sprawdź cookie sesji admina
  const adminSession = request.cookies.get(ADMIN_COOKIE_NAME)
  if (!adminSession?.value) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
