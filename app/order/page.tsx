'use client'

import { useState } from 'react'

const FILE_SITES = [
  { name: 'Bambu Lab MakerWorld', url: 'https://makerworld.com',         icon: '🟠' },
  { name: 'Printables',           url: 'https://www.printables.com',     icon: '🔴' },
  { name: 'Thingiverse',          url: 'https://www.thingiverse.com',    icon: '🔵' },
  { name: 'MyMiniFactory',        url: 'https://www.myminifactory.com',  icon: '🟢' },
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
      <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-neon-green/10 border border-neon-green/30 flex items-center justify-center text-4xl mx-auto mb-6">
            ✅
          </div>
          <h1 className="font-display text-3xl font-bold gradient-text mb-3">
            Zamówienie wysłane!
          </h1>
          <p className="text-gray-400 mb-2">
            Odezwę się na Twój e-mail z wyceną i terminem realizacji w ciągu 24h.
          </p>
          <p className="text-gray-600 text-sm mb-8">
            Sprawdź też folder Spam, jeśli nie widzisz wiadomości.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-gaming text-white font-medium text-sm hover:opacity-90 active:scale-95 transition-all"
          >
            ← Wróć do strony głównej
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Nagłówek */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            Wycena w 24h
          </div>
          <h1 className="font-display text-4xl font-bold gradient-text mb-4">Zamów wydruk 3D</h1>
          <p className="text-gray-400 text-lg">
            Znajdź model na jednym z serwisów, wklej link i wyślij — odezwę się z wyceną.
          </p>
        </div>

        {/* Linki do serwisów */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {FILE_SITES.map(site => (
            <a
              key={site.name}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-dark-surface border border-dark-border hover:border-neon-cyan/40 hover:bg-dark-card transition-all duration-200 text-center group"
            >
              <span className="text-2xl">{site.icon}</span>
              <span className="text-xs text-gray-400 group-hover:text-neon-cyan transition-colors leading-tight">
                {site.name}
              </span>
            </a>
          ))}
        </div>

        {/* Formularz */}
        <form onSubmit={handleSubmit} className="bg-dark-surface border border-dark-border rounded-2xl p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Twoje imię *</label>
              <input
                name="imie"
                type="text"
                required
                placeholder="Jan Kowalski"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">E-mail do odpowiedzi *</label>
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
            <label className="block text-sm text-gray-400 mb-2">Link do modelu *</label>
            <input
              name="link_do_modelu"
              type="url"
              required
              placeholder="https://makerworld.com/models/..."
              className={inputCls}
            />
            <p className="text-xs text-gray-600 mt-1.5">
              Wklej link z Bambu Lab, Printables, Thingiverse, MyMiniFactory itp.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Materiał</label>
              <select name="material" className={inputCls}>
                <option>PLA (standard)</option>
                <option>PLA+ (mocniejszy)</option>
                <option>PETG (odporny na ciepło)</option>
                <option>Resin (wysoka szczegółowość)</option>
                <option>Nie wiem — doradzcie</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Ilość sztuk</label>
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
            <label className="block text-sm text-gray-400 mb-2">Kolor</label>
            <select name="kolor" className={inputCls}>
              {COLORS.map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Dodatkowe uwagi</label>
            <textarea
              name="uwagi"
              rows={3}
              placeholder="Np. rozmiar x1.5, konkretna wersja modelu, szczegóły koloru..."
              className={inputCls + ' resize-none'}
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-neon-red/10 border border-neon-red/30 text-neon-red text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-gaming text-white font-semibold text-sm hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

          <p className="text-xs text-gray-600 text-center">
            Odpiszę w ciągu 24h z wyceną i terminem realizacji. Nie pobieramy zaliczki przed potwierdzeniem.
          </p>
        </form>
      </div>
    </div>
  )
}
