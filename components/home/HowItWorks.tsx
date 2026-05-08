const steps = [
  {
    num:     '01',
    icon:    '🔍',
    title:   'Znajdź model',
    desc:    'Przeglądaj Bambu Lab MakerWorld, Printables, Thingiverse lub MyMiniFactory i wybierz model, który chcesz wydrukować.',
    color:   '#00F5FF',
    border:  'rgba(0,245,255,0.25)',
    glow:    'rgba(0,245,255,0.12)',
  },
  {
    num:     '02',
    icon:    '📋',
    title:   'Wyślij zamówienie',
    desc:    'Wklej link do modelu, wybierz materiał i kolor. Wypełnij formularz — zajmie Ci to 2 minuty.',
    color:   '#B400FF',
    border:  'rgba(180,0,255,0.25)',
    glow:    'rgba(180,0,255,0.12)',
  },
  {
    num:     '03',
    icon:    '💬',
    title:   'Otrzymaj wycenę',
    desc:    'W ciągu 24h odezwę się z wyceną, szacowanym czasem realizacji i potwierdzeniem szczegółów.',
    color:   '#00FF88',
    border:  'rgba(0,255,136,0.25)',
    glow:    'rgba(0,255,136,0.12)',
  },
  {
    num:     '04',
    icon:    '📦',
    title:   'Odbierz wydruk',
    desc:    'Twój model zostaje wydrukowany z precyzją 0.1mm i wysłany do Ciebie. Jakość gwarantowana.',
    color:   '#FFD700',
    border:  'rgba(255,215,0,0.25)',
    glow:    'rgba(255,215,0,0.12)',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Nagłówek */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-green/25 bg-neon-green/5 text-neon-green/80 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            JAK TO DZIAŁA
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-100 mb-3">
            Od pomysłu do wydruku
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Prosty proces — bez komplikacji, bez zaliczki przed potwierdzeniem
          </p>
        </div>

        {/* Kroki */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <div key={step.num} className="relative group">
              {/* Łącznik między krokami */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute z-10"
                  style={{ top: '28px', left: 'calc(100% + 2px)', width: 'calc(100% - 32px)' }}
                >
                  <div
                    className="h-px w-full"
                    style={{ background: `linear-gradient(to right, ${step.color}50, ${steps[i + 1].color}50)` }}
                  />
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                    style={{ background: steps[i + 1].color, boxShadow: `0 0 6px ${steps[i + 1].color}` }}
                  />
                </div>
              )}

              <div
                className="relative p-6 rounded-2xl border transition-all duration-300 group-hover:-translate-y-2 overflow-hidden"
                style={{
                  borderColor: step.border,
                  background: `radial-gradient(circle at 50% 0%, ${step.glow}, transparent 70%)`,
                }}
              >
                {/* Permanent subtle top line */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-1/3 group-hover:w-2/3 rounded-full opacity-40 group-hover:opacity-80 transition-all duration-500"
                  style={{ background: step.color }}
                />

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 30%, ${step.glow}, transparent 70%)` }}
                />

                {/* Numer badge */}
                <div className="flex items-start justify-between mb-5 relative z-10">
                  <span
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-mono font-bold border"
                    style={{
                      color: step.color,
                      borderColor: step.border,
                      background: `${step.glow}`,
                    }}
                  >
                    {step.num}
                  </span>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${step.glow}`,
                      border: `1px solid ${step.border}`,
                      filter: `drop-shadow(0 0 8px ${step.color}40)`,
                    }}
                  >
                    {step.icon}
                  </div>
                </div>

                <h3 className="font-display font-bold text-gray-100 text-base mb-2 relative z-10">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed relative z-10">
                  {step.desc}
                </p>

                {/* Bottom color line */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 transition-all duration-500 rounded-full"
                  style={{ background: step.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/order"
            className="btn-shine inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-gaming text-white font-semibold text-sm hover:shadow-neon-cyan hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden relative"
          >
            <span>🖨️</span>
            Zamów własny wydruk teraz
            <span className="opacity-70">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
