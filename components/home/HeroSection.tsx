import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-dark-bg">

      {/* ── Siatka tła ──────────────────────────────────── */}
      <div className="absolute inset-0 grid-bg opacity-70" />

      {/* ── Orby świetlne ───────────────────────────────── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-neon-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-neon-purple/6 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] rounded-full bg-neon-cyan/4 blur-[100px] pointer-events-none" />

      {/* ── Scan line ───────────────────────────────────── */}
      <div className="scan-line-overlay absolute inset-0 pointer-events-none" />

      {/* ── Floating dots ───────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: '15%', left: '8%',  size: 'w-1 h-1',   delay: '0s',   dur: '4s'  },
          { top: '25%', left: '92%', size: 'w-1.5 h-1.5', delay: '1s',   dur: '5s'  },
          { top: '60%', left: '5%',  size: 'w-1 h-1',   delay: '2s',   dur: '6s'  },
          { top: '75%', left: '88%', size: 'w-2 h-2',   delay: '0.5s', dur: '4.5s'},
          { top: '40%', left: '95%', size: 'w-1 h-1',   delay: '3s',   dur: '5.5s'},
          { top: '85%', left: '15%', size: 'w-1.5 h-1.5', delay: '1.5s', dur: '7s'  },
          { top: '10%', left: '55%', size: 'w-1 h-1',   delay: '2.5s', dur: '4s'  },
          { top: '50%', left: '3%',  size: 'w-2 h-2',   delay: '4s',   dur: '6s'  },
        ].map((dot, i) => (
          <div
            key={i}
            className={`absolute ${dot.size} rounded-full bg-neon-cyan/50 float-animation`}
            style={{
              top: dot.top, left: dot.left,
              animationDelay: dot.delay,
              animationDuration: dot.dur,
              boxShadow: '0 0 6px rgba(0,245,255,0.8)',
            }}
          />
        ))}
      </div>

      {/* ── Treść główna ────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Lewa strona — tekst */}
          <div>
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan text-xs font-mono mb-8">
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              SYSTEM ONLINE — Nowe produkty dostępne
            </div>

            {/* Tytuł */}
            <h1 className="font-display font-black leading-[0.9] mb-6">
              <span className="block text-gray-100 text-6xl sm:text-7xl lg:text-8xl">DRUK 3D</span>
              <span
                className="block text-6xl sm:text-7xl lg:text-8xl gradient-text"
                style={{ WebkitTextStroke: '1px transparent' }}
              >
                DLA GRACZY
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-10 max-w-lg">
              Precyzyjnie wydrukowane figurki, akcesoria i gadżety. Od cyberpunkowych czaszek
              po modularne tereny RPG — wszystko z pasją i w najwyższej jakości.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 mb-14">
              <Link href="/products">
                <button className="btn-shine relative group px-8 py-4 rounded-xl bg-gradient-gaming text-white font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-neon-cyan hover:scale-105 active:scale-95">
                  Odkryj sklep →
                </button>
              </Link>
              <Link href="/order">
                <button className="group px-8 py-4 rounded-xl border border-neon-cyan/40 bg-neon-cyan/5 text-neon-cyan font-semibold text-sm transition-all duration-300 hover:bg-neon-cyan/10 hover:border-neon-cyan hover:shadow-neon-cyan-sm active:scale-95">
                  Zamów wydruk
                </button>
              </Link>
            </div>

            {/* Statystyki */}
            <div className="flex flex-wrap gap-8">
              {[
                { value: '8+',  label: 'Produktów',    accent: '#00F5FF' },
                { value: '6',   label: 'Kategorii',    accent: '#B400FF' },
                { value: '24h', label: 'Realizacja',   accent: '#00FF88' },
                { value: '99%', label: 'Zadowolonych', accent: '#FFD700' },
              ].map(stat => (
                <div key={stat.label} className="group">
                  <p
                    className="font-display font-black text-2xl sm:text-3xl"
                    style={{ color: stat.accent, textShadow: `0 0 20px ${stat.accent}60` }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-600 uppercase tracking-widest mt-0.5 group-hover:text-gray-400 transition-colors">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Prawa strona — 3D dekoracja */}
          <div className="hidden lg:flex items-center justify-center relative">
            {/* Zewnętrzny obracający się ring */}
            <div
              className="absolute w-80 h-80 rounded-full border border-neon-cyan/10"
              style={{ animation: 'rotate-slow 30s linear infinite' }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-neon-cyan shadow-neon-cyan-sm" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-neon-purple" />
            </div>

            {/* Środkowy ring */}
            <div
              className="absolute w-56 h-56 rounded-full border border-neon-purple/15"
              style={{ animation: 'rotate-slow 20s linear infinite reverse' }}
            >
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-neon-cyan/80" />
            </div>

            {/* Centralny sześcian 3D */}
            <div className="relative float-animation">
              <div
                className="w-48 h-48 rounded-2xl flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,245,255,0.1), rgba(180,0,255,0.1))',
                  border: '1px solid rgba(0,245,255,0.25)',
                  boxShadow: '0 0 60px rgba(0,245,255,0.15), 0 0 120px rgba(180,0,255,0.1), inset 0 0 40px rgba(0,245,255,0.05)',
                }}
              >
                {/* Siatka wewnątrz */}
                <div className="absolute inset-0 grid-bg-dense opacity-40" />

                {/* Ikona druku 3D */}
                <div className="relative z-10 text-center">
                  <div
                    className="text-6xl mb-2"
                    style={{ filter: 'drop-shadow(0 0 20px rgba(0,245,255,0.6))' }}
                  >
                    🖨️
                  </div>
                  <div className="font-display text-xs text-neon-cyan/80 tracking-widest uppercase">
                    3D Print
                  </div>
                </div>

                {/* Glow corner */}
                <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-3xl bg-neon-cyan/5" />
                <div className="absolute bottom-0 left-0 w-16 h-16 rounded-tr-3xl bg-neon-purple/5" />
              </div>

              {/* Floating tags wokół sześcianu */}
              {[
                { label: 'PLA+',  top: '-20px',    right: '-50px', delay: '0s',   textColor: '#00F5FF', borderColor: 'rgba(0,245,255,0.3)',   bg: 'rgba(0,245,255,0.06)'   },
                { label: 'PETG',  bottom: '-20px', left: '-50px',  delay: '1s',   textColor: '#B400FF', borderColor: 'rgba(180,0,255,0.3)',   bg: 'rgba(180,0,255,0.06)'  },
                { label: 'Resin', top: '30%',      left: '-60px',  delay: '2s',   textColor: '#00FF88', borderColor: 'rgba(0,255,136,0.3)',   bg: 'rgba(0,255,136,0.06)'  },
                { label: '0.1mm', bottom: '20%',   right: '-65px', delay: '0.5s', textColor: '#FFD700', borderColor: 'rgba(255,215,0,0.3)',   bg: 'rgba(255,215,0,0.06)'  },
              ].map(tag => (
                <div
                  key={tag.label}
                  className="absolute px-3 py-1 rounded-full text-xs font-mono font-bold border float-animation-slow"
                  style={{
                    top: (tag as any).top,
                    bottom: (tag as any).bottom,
                    left: (tag as any).left,
                    right: (tag as any).right,
                    animationDelay: tag.delay,
                    color: tag.textColor,
                    borderColor: tag.borderColor,
                    background: tag.bg,
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {tag.label}
                </div>
              ))}
            </div>

            {/* Ping animation */}
            <div
              className="absolute w-16 h-16 rounded-full border border-neon-cyan/30"
              style={{ animation: 'ping-slow 3s ease-in-out infinite' }}
            />
            <div
              className="absolute w-16 h-16 rounded-full border border-neon-cyan/20"
              style={{ animation: 'ping-slow 3s ease-in-out infinite 1.5s' }}
            />
          </div>
        </div>
      </div>

      {/* ── Dolna dekoracja ─────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0">
        {/* Linia gradientowa */}
        <div className="h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />
        {/* Tech pattern */}
        <div className="h-8 bg-gradient-to-t from-dark-surface/60 to-transparent" />
      </div>

      {/* ── Narożne dekoracje ───────────────────────────── */}
      <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-neon-cyan/30 pointer-events-none" />
      <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-neon-cyan/30 pointer-events-none" />
      <div className="absolute bottom-10 left-6 w-8 h-8 border-l-2 border-b-2 border-neon-cyan/20 pointer-events-none" />
      <div className="absolute bottom-10 right-6 w-8 h-8 border-r-2 border-b-2 border-neon-cyan/20 pointer-events-none" />
    </section>
  )
}
