import Link from 'next/link'
import { CATEGORIES } from '@/lib/constants'
import { cn } from '@/lib/utils'

const categoryColors = [
  'hover:border-neon-cyan/50 hover:shadow-neon-cyan',
  'hover:border-neon-purple/50 hover:shadow-neon-purple',
  'hover:border-neon-green/50 hover:shadow-neon-green',
  'hover:border-yellow-500/50',
  'hover:border-neon-orange/50',
  'hover:border-neon-red/50',
]

export default function CategoryBanner() {
  return (
    <section className="py-20 bg-dark-surface border-y border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-neon-cyan mb-2">
            Kategorie
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-100">
            Znajdź to, czego szukasz
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.value}
              href={`/products?category=${cat.value}`}
              className={cn(
                'group flex flex-col items-center gap-3 p-5 rounded-xl',
                'bg-dark-card border border-dark-border transition-all duration-300',
                '-translate-y-0 hover:-translate-y-1',
                categoryColors[i]
              )}
            >
              <span className="text-3xl group-hover:scale-125 transition-transform duration-300">
                {cat.icon}
              </span>
              <span className="text-xs font-semibold text-gray-400 group-hover:text-gray-100 text-center transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
