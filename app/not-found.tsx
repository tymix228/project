import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6 px-4 bg-dark-bg">
      <div className="font-display text-8xl font-black gradient-text">404</div>
      <h1 className="font-display text-2xl font-bold text-gray-200">Strona nie znaleziona</h1>
      <p className="text-gray-500 text-center max-w-sm">
        Szukana strona nie istnieje lub produkt został usunięty.
      </p>
      <div className="flex gap-3">
        <Link href="/">
          <Button variant="secondary">← Strona główna</Button>
        </Link>
        <Link href="/products">
          <Button>Sklep</Button>
        </Link>
      </div>
    </div>
  )
}
