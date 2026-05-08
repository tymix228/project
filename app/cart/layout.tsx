import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Koszyk — NeonForge',
  description: 'Twój koszyk zakupowy w sklepie NeonForge.',
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
