import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-dark-bg">
      {/* Tło siatki */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Efekt świetlny */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-neon-cyan/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan text-xs font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            Nowe produkty dostępne
          </div>

          {/* Tytuł */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-none mb-6">
            <span className="block text-gray-100">DRUK 3D</span>
            <span className="block gradient-text">DLA GRACZY</span>
          </h1>

          <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-xl">
            Precyzyjnie wydrukowane figurki, akcesoria i gadżety. Od cyberpunkowych czaszek po
            modularne tereny RPG — wszystko z pasją i w najwyższej jakości.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <Link href="/products">
              <Button size="lg">
                Odkryj sklep →
              </Button>
            </Link>
            <Link href="/products?tag=featured">
              <Button size="lg" variant="secondary">
                Polecane
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-16">
            {[
              { value: '8+',    label: 'Produktów' },
              { value: '6',     label: 'Kategorii' },
              { value: '99%',   label: 'Zadowolonych' },
              { value: '24h',   label: 'Czas druku' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="font-display font-black text-2xl gradient-text">{stat.value}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dekoracja dolna */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
    </section>
  )
}
