'use client'

import { useState } from 'react'

const FILE_SITES = [
  { name: 'Bambu Lab MakerWorld', url: 'https://makerworld.com',        abbr: 'BL',  color: '#FF6B00', border: 'rgba(255,107,0,0.3)',  bg: 'rgba(255,107,0,0.08)'  },
  { name: 'Printables',           url: 'https://www.printables.com',    abbr: 'PR',  color: '#FF3D3D', border: 'rgba(255,61,61,0.3)',   bg: 'rgba(255,61,61,0.08)'  },
  { name: 'Thingiverse',          url: 'https://www.thingiverse.com',   abbr: 'TV',  color: '#00B4FF', border: 'rgba(0,180,255,0.3)',   bg: 'rgba(0,180,255,0.08)'  },
  { name: 'MyMiniFactory',        url: 'https://www.myminifactory.com', abbr: 'MMF', color: '#00FF88', border: 'rgba(0,255,136,0.3)',   bg: 'rgba(0,255,136,0.08)'  },
]

const COLORS = [
  'Czarny', 'Biały', 'Szary', 'Srebrny',
  'Czerwony', 'Niebieski', 'Zielony', 'Żółty',
  'Pomarańczowy', 'Fioletowy', 'Różowy', 'Brązowy',
  'Przezroczysty', 'Inny (opiszę w uwagach)',
]

const inputCls = 'w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-gray-200 placeholder-gray-600 focus:outline-none focus:border-neon-cyan/60 focus:ring-1 focus:ring-neon-cyan/20 transition-colors'

export default function OrderPage() {
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const fd = new FormData(e.currentTarget)
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(fd)),
    })

    if (res.ok) {
      setSent(true)
    } else {
      setError('Coś poszło nie tak. Spróbuj ponownie lub napisz bezpośrednio na tymonbx@gmail.com')
    }
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-neon-green/5 blur-[100px] pointer-events-none" />
        <div className="relative text-center max-w-md">
          <div className="relative inline-block mb-8">
            <div
              className="w-24 h-24 rounded-3xl bg-neon-green/10 border border-neon-green/30 flex items-center justify-center text-5xl mx-auto float-animation"
              style={{ boxShadow: '0 0 40px rgba(0,255,136,0.2)' }}
            >
              ✓
            </div>
            <div className="absolute -inset-3 rounded-[30px] bg-neon-green/8 blur-xl animate-pulse" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-green/30 bg-neon-green/8 text-neon-green text-[10px] font-mono mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            ZAMÓWIENIE PRZYJĘTE
          </div>
          <h1 className="font-display text-3xl font-bold gradient-text-green mb-3">
            Gotowe!
          </h1>
          <p className="text-gray-400 mb-2">
            Odezwę się na Twój e-mail z wyceną i terminem realizacji w ciągu <span className="text-neon-cyan font-mono font-bold">24h</span>.
          </p>
          <p className="text-gray-600 text-sm mb-8 font-mono">
            Sprawdź folder Spam jeśli nie widzisz wiadomości.
          </p>
          <a
            href="/"
            className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-gaming text-white font-medium text-sm hover:opacity-90 active:scale-95 transition-all overflow-hidden"
          >
            ← Wróć do strony głównej
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg py-16 px-4 relative">
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-neon-cyan/4 blur-[100px] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto">
        {/* Nagłówek */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            WYCENA W 24H
          </div>
          <h1 className="font-display text-4xl font-bold gradient-text mb-4">Zamów wydruk 3D</h1>
          <p className="text-gray-400 text-base">
            Znajdź model na jednym z serwisów, wklej link i wyślij — odezwę się z wyceną.
          </p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {[
            { n: '1', label: 'Znajdź model', color: '#00F5FF' },
            { n: '2', label: 'Wyślij link',  color: '#B400FF' },
            { n: '3', label: 'Wycena 24h',   color: '#00FF88' },
          ].map((step, i) => (
            <div key={step.n} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold font-display border-2 text-white"
                  style={{ borderColor: step.color, background: `${step.color}20`, color: step.color, boxShadow: `0 0 12px ${step.color}40` }}
                >
                  {step.n}
                </div>
                <span className="text-[10px] text-gray-600 mt-1 font-mono whitespace-nowrap">{step.label}</span>
              </div>
              {i < 2 && (
                <div className="w-16 h-px mx-1 mb-4" style={{ background: `linear-gradient(to right, ${step.color}50, ${[...['#00F5FF','#B400FF','#00FF88']][i+1]}50)` }} />
              )}
            </div>
          ))}
        </div>

        {/* Linki do serwisów */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono mb-3 text-center">
            Popularne serwisy z modelami
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {FILE_SITES.map(site => (
              <a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2.5 p-4 rounded-xl bg-dark-surface border border-dark-border transition-all duration-200 text-center hover:-translate-y-1 overflow-hidden relative"
                style={{ '--site-color': site.color } as React.CSSProperties}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 rounded-full transition-all duration-400"
                  style={{ background: site.color }} />
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-mono font-black flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                  style={{ color: site.color, background: site.bg, border: `1px solid ${site.border}` }}
                >
                  {site.abbr}
                </div>
                <span className="text-xs text-gray-500 group-hover:text-gray-200 transition-colors leading-tight font-medium">
                  {site.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Formularz */}
        <div className="bg-dark-surface border border-dark-border rounded-2xl overflow-hidden">
          <div className="h-px bg-gradient-gaming opacity-50" />
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono mb-2">Twoje imię *</label>
              <input
                name="imie"
                type="text"
                required
                placeholder="Jan Kowalski"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono mb-2">E-mail do odpowiedzi *</label>
              <input
                name="email"
                type="email"
                required
                placeholder="jan@gmail.com"
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono mb-2">Link do modelu *</label>
            <input
              name="link_do_modelu"
              type="url"
              required
              placeholder="https://makerworld.com/models/..."
              className={inputCls}
            />
            <p className="text-xs text-gray-600 mt-1.5 font-mono">
              Wklej link z Bambu Lab, Printables, Thingiverse, MyMiniFactory itp.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono mb-2">Materiał</label>
              <select name="material" className={inputCls}>
                <option>PLA (standard)</option>
                <option>PLA+ (mocniejszy)</option>
                <option>PETG (odporny na ciepło)</option>
                <option>Resin (wysoka szczegółowość)</option>
                <option>Nie wiem — doradzcie</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono mb-2">Ilość sztuk</label>
              <input
                name="ilosc"
                type="number"
                min="1"
                max="50"
                defaultValue="1"
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono mb-2">Kolor</label>
            <select name="kolor" className={inputCls}>
              {COLORS.map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono mb-2">Dodatkowe uwagi</label>
            <textarea
              name="uwagi"
              rows={3}
              placeholder="Np. rozmiar x1.5, konkretna wersja modelu, szczegóły koloru..."
              className={inputCls + ' resize-none'}
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-neon-red/8 border border-neon-red/25 text-neon-red text-sm">
              <span className="font-mono text-base leading-none mt-0.5">✕</span>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-shine w-full py-3.5 rounded-xl bg-gradient-gaming text-white font-semibold text-sm hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Wysyłanie...
              </>
            ) : (
              'Wyślij zamówienie →'
            )}
          </button>

          <p className="text-xs text-gray-600 text-center font-mono">
            Odpiszę w ciągu 24h z wyceną i terminem realizacji.
          </p>
          </form>
        </div>
      </div>
    </div>
  )
}

