import Link from 'next/link'

export default function CtaBanner() {
  return (
    <section className="relative py-20 bg-dark-bg overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-25" />

      {/* Big center orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-neon-cyan/4 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[200px] rounded-full bg-neon-purple/5 blur-[80px] pointer-events-none" />

      {/* Top + bottom separator lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/20 to-transparent" />

      {/* Corner accents */}
      <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-neon-cyan/20 pointer-events-none" />
      <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-neon-cyan/20 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-neon-purple/15 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-neon-purple/15 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/25 bg-neon-cyan/5 text-neon-cyan/80 text-xs font-mono mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
          WŁASNY PROJEKT? WYDRUKUJEMY GO DLA CIEBIE
        </div>

        {/* Heading */}
        <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6">
          <span className="text-gray-100 block">Masz model 3D?</span>
          <span className="gradient-text block">Zrealizujemy go.</span>
        </h2>

        <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
          Wklej link do pliku STL z dowolnego serwisu — Printables, Thingiverse, MakerWorld —
          i dostań wycenę w ciągu 24h. Zero zaliczek przed potwierdzeniem.
        </p>

        {/* Feature chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { icon: '⚡', text: 'Wycena 24h',        color: 'text-neon-cyan  border-neon-cyan/25  bg-neon-cyan/5'   },
            { icon: '🎯', text: 'Precyzja 0.1mm',    color: 'text-neon-green border-neon-green/25 bg-neon-green/5'  },
            { icon: '🎨', text: 'Wybór materiału',   color: 'text-neon-purple border-neon-purple/25 bg-neon-purple/5'},
            { icon: '📦', text: 'Szybka wysyłka',    color: 'text-neon-gold  border-yellow-500/25  bg-yellow-500/5' },
          ].map(chip => (
            <span
              key={chip.text}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold font-mono ${chip.color}`}
            >
              <span>{chip.icon}</span>
              {chip.text}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/order">
            <button className="btn-shine relative group px-8 py-4 rounded-xl bg-gradient-gaming text-white font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-neon-cyan hover:scale-105 active:scale-95">
              Zamów wydruk teraz →
            </button>
          </Link>
          <Link href="/contact">
            <button className="px-8 py-4 rounded-xl border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan font-semibold text-sm transition-all duration-300 hover:bg-neon-cyan/10 hover:border-neon-cyan hover:shadow-neon-cyan-sm active:scale-95">
              Napisz do nas
            </button>
          </Link>
        </div>

        {/* Terminal hint */}
        <p className="text-gray-700 text-xs font-mono mt-8 cursor-blink">
          $ neonforge --print --material=PLA+ --precision=0.1mm
        </p>
      </div>
    </section>
  )
}
