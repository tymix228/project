import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center gap-8 px-4 bg-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-neon-red/4 blur-[80px]" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[200px] rounded-full bg-neon-purple/4 blur-[60px]" />
      <div className="scan-line-overlay absolute inset-0" />

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-10 h-10 border-l-2 border-t-2 border-neon-red/30" />
      <div className="absolute top-8 right-8 w-10 h-10 border-r-2 border-t-2 border-neon-red/30" />
      <div className="absolute bottom-8 left-8 w-10 h-10 border-l-2 border-b-2 border-neon-red/20" />
      <div className="absolute bottom-8 right-8 w-10 h-10 border-r-2 border-b-2 border-neon-red/20" />

      <div className="relative text-center">
        {/* Glitch 404 */}
        <div className="relative inline-block mb-6">
          <h1
            className="glitch font-display font-black leading-none select-none"
            data-text="404"
            style={{
              fontSize: 'clamp(100px, 20vw, 180px)',
              background: 'linear-gradient(135deg, #00F5FF, #B400FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            404
          </h1>
          {/* Ghost glow */}
          <div
            className="absolute inset-0 font-display font-black leading-none pointer-events-none blur-2xl opacity-30"
            style={{ fontSize: 'clamp(100px, 20vw, 180px)', color: '#00F5FF' }}
            aria-hidden
          >
            404
          </div>
        </div>

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-red/35 bg-neon-red/8 text-neon-red text-xs font-mono mb-5">
          <span className="w-2 h-2 rounded-full bg-neon-red animate-pulse" />
          SIGNAL LOST — PAGE NOT FOUND
        </div>

        <h2 className="font-display text-2xl font-bold text-gray-200 mb-2">Strona nie istnieje</h2>
        <p className="text-gray-500 max-w-sm mx-auto text-sm mb-8">
          Szukana strona nie istnieje lub produkt został przeniesiony.
          Sprawdź adres URL lub wróć do sklepu.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/"><Button variant="secondary">← Strona główna</Button></Link>
          <Link href="/products"><Button>Sklep</Button></Link>
          <Link href="/order"><Button variant="outline">Zamów wydruk</Button></Link>
        </div>

        {/* Terminal-style hint */}
        <p className="text-gray-700 text-xs font-mono mt-8 cursor-blink">
          $ curl -X GET /api/lost-page
        </p>
      </div>
    </div>
  )
}
