import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zamów wydruk 3D — NeonForge',
  description: 'Zamów własny wydruk 3D. Wyślij link do modelu, wybierz materiał i kolor — wycena w ciągu 24h.',
}

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
