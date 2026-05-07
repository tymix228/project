import { NextResponse } from 'next/server'
import { ADMIN_COOKIE_NAME } from '@/lib/constants'

export async function GET() {
  const response = NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))
  response.cookies.delete(ADMIN_COOKIE_NAME)
  return response
}
