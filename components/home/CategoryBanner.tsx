import Link from 'next/link'
import { CATEGORIES } from '@/lib/constants'

const categoryStyle = [
  {
    gradient: 'from-neon-cyan/10 to-neon-cyan/5',
    border:   'border-neon-cyan/20',
    hover:    'hover:border-neon-cyan/60 hover:shadow-neon-cyan',
    dot:      'bg-neon-cyan',
    text:     'group-hover:text-neon-cyan',
    glow:     'rgba(0,245,255,0.15)',
  },
  {
    gradient: 'from-neon-purple/10 to-neon-purple/5',
    border:   'border-neon-purple/20',
    hover:    'hover:border-neon-purple/60 hover:shadow-neon-purple',
    dot:      'bg-neon-purple',
    text:     'group-hover:text-neon-purple',
    glow:     'rgba(180,0,255,0.15)',
  },
  {
    gradient: 'from-neon-green/10 to-neon-green/5',
    border:   'border-neon-green/20',
    hover:    'hover:border-neon-green/60 hover:shadow-neon-green',
    dot:      'bg-neon-green',
    text:     'group-hover:text-neon-green',
    glow:     'rgba(0,255,136,0.15)',
  },
  {
    gradient: 'from-yellow-500/10 to-yellow-500/5',
    border:   'border-yellow-500/20',
    hover:    'hover:border-yellow-400/60',
    dot:      'bg-yellow-400',
    text:     'group-hover:text-yellow-400',
    glow:     'rgba(255,215,0,0.15)',
  },
  {
    gradient: 'from-neon-orange/10 to-neon-orange/5',
    border:   'border-neon-orange/20',
    hover:    'hover:border-neon-orange/60 hover:shadow-neon-orange',
    dot:      'bg-neon-orange',
    text:     'group-hover:text-neon-orange',
    glow:     'rgba(255,107,0,0.15)',
  },
  {
    gradient: 'from-neon-red/10 to-neon-red/5',
    border:   'border-neon-red/20',
    hover:    'hover:border-neon-red/60 hover:shadow-neon-red',
    dot:      'bg-neon-red',
    text:     'group-hover:text-neon-red',
    glow:     'rgba(255,0,68,0.15)',
  },
]

export default function CategoryBanner() {
  return (
    <section className="py-24 bg-dark-surface border-y border-dark-border relative overflow-hidden">
      {/* Tło siatka */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Orb tło */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full bg-neon-cyan/3 blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Nagłówek sekcji */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/20 bg-dark-bg text-neon-cyan/80 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            KATEGORIE
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-100 mb-3">
            Znajdź to, czego szukasz
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            6 kategorii — od cyberpunkowych figurek po profesjonalne akcesoria gamingowe
          </p>
        </div>

        {/* Siatka kategorii */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat, i) => {
            const style = categoryStyle[i]
            return (
              <Link
                key={cat.value}
                href={`/products?category=${cat.value}`}
                className={`group relative flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br ${style.gradient} border ${style.border} ${style.hover} transition-all duration-300 hover:-translate-y-2 overflow-hidden`}
              >
                {/* Tło glow przy hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${style.glow}, transparent 70%)` }}
                />

                {/* Dot dekoracyjny */}
                <div className={`absolute top-3 right-3 w-1.5 h-1.5 rounded-full ${style.dot} opacity-0 group-hover:opacity-100 transition-all duration-300`} />

                {/* Ikona */}
                <span
                  className="text-4xl relative z-10 transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-6"
                  style={{ filter: `drop-shadow(0 0 12px ${style.glow})` }}
                >
                  {cat.icon}
                </span>

                {/* Nazwa */}
                <span className={`text-xs font-semibold text-gray-400 ${style.text} text-center transition-colors duration-300 relative z-10 leading-tight`}>
                  {cat.label}
                </span>

                {/* Arrow — appears on hover */}
                <span className={`relative z-10 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 ${style.text}`}>
                  → przeglądaj
                </span>

                {/* Dolna linia dekoracyjna */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 ${style.dot} transition-all duration-500 rounded-full opacity-60`} />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
