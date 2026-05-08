const stats = [
  {
    value: '500+',
    label: 'Wydruków',
    sublabel: 'zrealizowanych zamówień',
    icon: '🖨️',
    color: '#00F5FF',
  },
  {
    value: '8',
    label: 'Kategorii',
    sublabel: 'produktów i usług',
    icon: '📦',
    color: '#B400FF',
  },
  {
    value: '24h',
    label: 'Czas realizacji',
    sublabel: 'wycena w ciągu doby',
    icon: '⚡',
    color: '#00FF88',
  },
  {
    value: '99%',
    label: 'Zadowolonych',
    sublabel: 'klientów wraca',
    icon: '⭐',
    color: '#FFD700',
  },
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-dark-bg relative overflow-hidden">
      {/* Tło */}
      <div className="absolute inset-0 dot-bg opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative flex flex-col items-center text-center p-6 rounded-2xl bg-dark-surface border border-dark-border hover:border-opacity-60 transition-all duration-300 overflow-hidden"
              style={{ '--accent': stat.color } as React.CSSProperties}
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${stat.color}10, transparent 70%)` }}
              />

              {/* Top border accent */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-0.5 transition-all duration-500 rounded-full"
                style={{ background: stat.color }}
              />

              <span className="text-3xl mb-3 relative z-10"
                style={{ filter: `drop-shadow(0 0 10px ${stat.color}50)` }}>
                {stat.icon}
              </span>

              <p
                className="font-display font-black text-3xl lg:text-4xl relative z-10"
                style={{ color: stat.color, textShadow: `0 0 30px ${stat.color}40` }}
              >
                {stat.value}
              </p>

              <p className="font-semibold text-gray-200 text-sm mt-1 relative z-10">
                {stat.label}
              </p>
              <p className="text-xs text-gray-600 mt-0.5 relative z-10">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
