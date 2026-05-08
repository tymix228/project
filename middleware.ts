import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('admin_session')
  if (cookie?.value !== 'ok') {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  // Chroń wszystko w /admin poza /admin/login
  matcher: ['/admin/((?!login).*)'],
}
