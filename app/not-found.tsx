import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center gap-6 px-4 bg-dark-bg relative overflow-hidden">
      {/* Siatka tła */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Efekty świetlne */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-neon-cyan/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[200px] rounded-full bg-neon-purple/5 blur-[60px] pointer-events-none" />

      {/* Linia skanowania */}
      <div className="scan-line-overlay absolute inset-0 pointer-events-none" />

      <div className="relative text-center">
        {/* Kod błędu */}
        <div className="relative inline-block mb-4">
          <p className="font-display text-[120px] sm:text-[160px] font-black leading-none gradient-text select-none">
            404
          </p>
          <p className="absolute inset-0 font-display text-[120px] sm:text-[160px] font-black leading-none text-neon-cyan/10 blur-sm select-none">
            404
          </p>
        </div>

        {/* Komunikat */}
        <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-red/30 bg-neon-red/5 text-neon-red text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-red animate-pulse" />
          ERROR — PAGE NOT FOUND
        </div>

        <h1 className="font-display text-2xl font-bold text-gray-200 mt-4 mb-2">
          Strona nie istnieje
        </h1>
        <p className="text-gray-500 max-w-sm mx-auto text-sm mb-8">
          Szukana strona nie istnieje lub produkt został przeniesiony/usunięty.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/">
            <Button variant="secondary">← Strona główna</Button>
          </Link>
          <Link href="/products">
            <Button>Sklep</Button>
          </Link>
          <Link href="/order">
            <Button variant="outline">Zamów wydruk</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
