'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/constants'

const FILE_SITES = [
  { name: 'Bambu Lab MakerWorld', url: 'https://makerworld.com', icon: '🟠' },
  { name: 'Printables',           url: 'https://www.printables.com', icon: '🔴' },
  { name: 'Thingiverse',          url: 'https://www.thingiverse.com', icon: '🔵' },
  { name: 'MyMiniFactory',        url: 'https://www.myminifactory.com', icon: '🟢' },
]

export default function OrderPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = new FormData(form)

    await fetch('https://formsubmit.co/tymonbx@gmail.com', {
      method: 'POST',
      body: data,
    })

    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="font-display text-2xl font-bold gradient-text mb-3">Zamówienie wysłane!</h1>
          <p className="text-gray-400">
            Dostałem Twoje zgłoszenie. Odezwę się na podany adres e-mail z wyceną i terminem realizacji.
          </p>
          <a
            href="/"
            className="inline-block mt-6 px-6 py-3 rounded-xl bg-gradient-gaming text-white font-medium text-sm hover:opacity-90 transition-all"
          >
            Wróć na stronę główną
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
          <h1 className="font-display text-4xl font-bold gradient-text mb-4">Zamów wydruk</h1>
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
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-dark-surface border border-dark-border
                         hover:border-neon-cyan/40 hover:bg-dark-card transition-all duration-200 text-center group"
            >
              <span className="text-2xl">{site.icon}</span>
              <span className="text-xs text-gray-400 group-hover:text-neon-cyan transition-colors leading-tight">
                {site.name}
              </span>
            </a>
          ))}
        </div>

        {/* Formularz */}
        <form
          onSubmit={handleSubmit}
          className="bg-dark-surface border border-dark-border rounded-2xl p-8 space-y-5"
        >
          {/* Ukryte pola formsubmit */}
          <input type="hidden" name="_subject" value={`Nowe zamówienie wydruku — ${SITE_NAME}`} />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />

          <div>
            <label className="block text-sm text-gray-400 mb-2">Twoje imię *</label>
            <input
              name="imie"
              type="text"
              required
              placeholder="Jan Kowalski"
              className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-gray-200
                         placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Twój e-mail (do odpowiedzi) *</label>
            <input
              name="email"
              type="email"
              required
              placeholder="jan@gmail.com"
              className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-gray-200
                         placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Link do modelu *</label>
            <input
              name="link_do_modelu"
              type="url"
              required
              placeholder="https://makerworld.com/models/..."
              className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-gray-200
                         placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 transition-colors"
            />
            <p className="text-xs text-gray-600 mt-1">Wklej link z Bambu Lab, Printables, Thingiverse itp.</p>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Materiał</label>
            <select
              name="material"
              className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-gray-200
                         focus:outline-none focus:border-neon-cyan/50 transition-colors"
            >
              <option value="PLA (standard)">PLA (standard)</option>
              <option value="PLA+ (mocniejszy)">PLA+ (mocniejszy)</option>
              <option value="PETG (odporny na ciepło)">PETG (odporny na ciepło)</option>
              <option value="Resin (detale)">Resin (detale)</option>
              <option value="Nie wiem — doradzcie">Nie wiem — doradzcie</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Kolor / uwagi</label>
            <textarea
              name="uwagi"
              rows={4}
              placeholder="Np. kolor czarny, rozmiar x2, specjalne życzenia..."
              className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-gray-200
                         placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-gaming text-white font-medium
                       hover:opacity-90 active:scale-95 transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Wysyłanie...' : 'Wyślij zamówienie →'}
          </button>

          <p className="text-xs text-gray-600 text-center">
            Odpiszę w ciągu 24h z wyceną i terminem realizacji
          </p>
        </form>
      </div>
    </div>
  )
}
