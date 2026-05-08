import { withAuth } from 'next-auth/middleware'

// Chronione trasy — tylko zalogowany admin ma dostęp
export default withAuth({
  pages: {
    signIn: '/admin/login',
  },
})

export const config = {
  matcher: ['/admin/:path*'],
}
