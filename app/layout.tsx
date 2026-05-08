import type { Metadata } from 'next'
import { Inter, Orbitron, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'
import Providers from '@/components/Providers'
import ScrollToTop from '@/components/ui/ScrollToTop'
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
    'Sklep z produktami drukowanymi w 3D dla graczy, cosplayerów i pasjonatów futurystycznego designu. Figurki, akcesoria, cosplay — precyzja 0.1mm.',
  keywords: ['druk 3D', 'gaming', 'figurki', 'akcesoria', 'cosplay', 'sklep', 'PLA', 'PETG', 'Resin', 'wydruk 3D na zamówienie'],
  authors: [{ name: 'NeonForge Store' }],
  creator: 'NeonForge Store',
  openGraph: {
    title: 'NeonForge Store — Druk 3D dla Graczy',
    description: 'Precyzyjnie wydrukowane figurki, akcesoria i gadżety dla graczy i twórców. Precyzja 0.1mm.',
    type: 'website',
    locale: 'pl_PL',
    siteName: 'NeonForge Store',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeonForge Store — Druk 3D dla Graczy',
    description: 'Precyzyjnie wydrukowane figurki, akcesoria i gadżety dla graczy i twórców.',
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: '#00F5FF',
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
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <MobileNav />
          <ScrollToTop />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#0D1117',
                color: '#E2E8FF',
                border: '1px solid #1C2333',
                borderRadius: '12px',
                fontSize: '13px',
                fontFamily: 'var(--font-inter)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,245,255,0.05)',
              },
              success: {
                iconTheme: { primary: '#00FF88', secondary: '#0D1117' },
                style: { borderColor: 'rgba(0,255,136,0.2)' },
              },
              error: {
                iconTheme: { primary: '#FF0044', secondary: '#0D1117' },
                style: { borderColor: 'rgba(255,0,68,0.2)' },
              },
            }}
          />
        </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
