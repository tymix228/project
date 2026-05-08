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
              className="group relative flex flex-col items-center text-center p-6 rounded-2xl bg-dark-surface border border-dark-border hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              style={{ borderColor: `${stat.color}18` }}
            >
              {/* Permanent subtle top accent */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-0.5 rounded-full opacity-30 group-hover:opacity-80 group-hover:w-2/3 transition-all duration-500"
                style={{ background: stat.color }}
              />

              {/* Background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${stat.color}12, transparent 65%)` }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 relative z-10 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${stat.color}10`,
                  border: `1px solid ${stat.color}25`,
                  filter: `drop-shadow(0 0 12px ${stat.color}30)`,
                }}
              >
                {stat.icon}
              </div>

              <p
                className="font-display font-black text-3xl lg:text-4xl relative z-10 transition-all duration-300"
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
