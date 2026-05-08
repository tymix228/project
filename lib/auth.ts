import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// Tylko ten e-mail ma dostęp do panelu admina
const ADMIN_EMAIL = 'tymonbx@gmail.com'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // Zezwól na logowanie tylko admina
    async signIn({ user }) {
      return user.email === ADMIN_EMAIL
    },

    // Dodaj info czy użytkownik jest adminem do sesji
    async session({ session }) {
      if (session.user) {
        session.user.isAdmin = session.user.email === ADMIN_EMAIL
      }
      return session
    },
  },

  pages: {
    signIn:  '/admin/login',   // nasza własna strona logowania
    error:   '/admin/login',   // błędy też tu
  },
}

// Rozszerzenie typów NextAuth
declare module 'next-auth' {
  interface Session {
    user: {
      name?:    string | null
      email?:   string | null
      image?:   string | null
      isAdmin?: boolean
    }
  }
}
