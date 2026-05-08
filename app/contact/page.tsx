import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Skontaktuj się z nami — odpowiemy tak szybko jak to możliwe.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark-bg py-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Nagłówek */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold gradient-text mb-4">Kontakt</h1>
          <p className="text-gray-400 text-lg">
            Masz pytanie o produkt, zamówienie indywidualne lub coś innego?<br />
            Napisz — odpiszę najszybciej jak mogę.
          </p>
        </div>

        {/* Karta kontaktowa */}
        <div className="bg-dark-surface border border-dark-border rounded-2xl p-8 space-y-8">

          {/* E-mail */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">E-mail</p>
              <a
                href="mailto:tymonbx@gmail.com"
                className="text-neon-cyan font-medium text-lg hover:underline transition-all"
              >
                tymonbx@gmail.com
              </a>
              <p className="text-gray-600 text-sm mt-1">
                Odpowiadam zazwyczaj w ciągu 24 godzin
              </p>
            </div>
          </div>

          <div className="border-t border-dark-border" />

          {/* Zamówienia indywidualne */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-neon-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Zamówienia indywidualne</p>
              <p className="text-gray-200 font-medium">Drukuję na zamówienie</p>
              <p className="text-gray-600 text-sm mt-1">
                Opisz co chcesz — model, materiał, kolor, rozmiar — a przygotuję wycenę.
              </p>
            </div>
          </div>

          <div className="border-t border-dark-border" />

          {/* CTA */}
          <div className="text-center pt-2">
            <a
              href="mailto:tymonbx@gmail.com?subject=Zapytanie%20ze%20sklepu%20NeonForge"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                         bg-gradient-gaming text-white font-medium text-sm
                         hover:opacity-90 active:scale-95 transition-all duration-200
                         shadow-lg shadow-neon-cyan/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Napisz do mnie
            </a>
          </div>
        </div>

        {/* Info */}
        <p className="text-center text-gray-600 text-sm mt-8">
          {SITE_NAME} — druk 3D dla graczy i twórców
        </p>
      </div>
    </div>
  )
}
