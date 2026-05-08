import type { Metadata } from 'next'
import { Inter, Orbitron, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Providers from '@/components/Providers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'NeonForge Store — Druk 3D dla Graczy',
    template: '%s | NeonForge Store',
  },
  description:
    'Sklep z produktami drukowanymi w 3D dla graczy, cosplayerów i pasjonatów futurystycznego designu.',
  keywords: ['druk 3D', 'gaming', 'figurki', 'akcesoria', 'cosplay', 'sklep'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} font-body min-h-screen flex flex-col`}
      >
        <Providers>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#0D1117',
                color: '#E2E8FF',
                border: '1px solid #1C2333',
              },
              success: { iconTheme: { primary: '#00FF88', secondary: '#0D1117' } },
              error:   { iconTheme: { primary: '#FF0044', secondary: '#0D1117' } },
            }}
          />
        </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
