import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME } from '@/lib/constants'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: `Kontakt — ${SITE_NAME}`,
  description: 'Skontaktuj się z nami — odpowiemy tak szybko jak to możliwe.',
}

const contactItems = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    label: 'E-mail',
    value: 'tymonbx@gmail.com',
    href: 'mailto:tymonbx@gmail.com',
    sub: 'Odpowiadam w ciągu 24h',
    color: 'neon-cyan',
    borderColor: 'border-neon-cyan/20',
    bgColor: 'bg-neon-cyan/10',
    textColor: 'text-neon-cyan',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
        />
      </svg>
    ),
    label: 'Zamówienia indywidualne',
    value: 'Formularz zamówień',
    href: '/order',
    sub: 'Wycena w 24h, bez zaliczki',
    color: 'neon-purple',
    borderColor: 'border-neon-purple/20',
    bgColor: 'bg-neon-purple/10',
    textColor: 'text-neon-purple',
  },
]

const faq = [
  { q: 'Ile trwa realizacja zamówienia?', a: 'Standardowo 3-7 dni roboczych od potwierdzenia. Ekspresowe zamówienia możliwe do ustalenia.' },
  { q: 'Jakie materiały oferujecie?', a: 'PLA, PLA+, PETG, ABS oraz żywica (Resin) do szczegółowych modeli. Dobieramy materiał do projektu.' },
  { q: 'Czy drukujecie własne modele?', a: 'Tak! Wyślij plik STL/OBJ lub link do modelu z MakerWorld/Printables. Możemy też pomóc z przygotowaniem pliku.' },
  { q: 'Jak wygląda płatność?', a: 'Płatność po potwierdzeniu zamówienia i wyceny. Nie pobieramy zaliczek przed akceptacją przez klienta.' },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark-bg py-16 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-neon-cyan/4 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[200px] rounded-full bg-neon-purple/4 blur-[100px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/25 bg-neon-cyan/5 text-neon-cyan text-xs font-mono mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            KONTAKT
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Skontaktuj się z nami
          </h1>
          <p className="text-gray-400 text-base max-w-md mx-auto leading-relaxed">
            Masz pytanie o produkt, chcesz zamówić własny wydruk lub po prostu porozmawiać?
            Odpiszę najszybciej jak mogę.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Contact cards */}
          <div className="space-y-4">
            {contactItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                className={`group flex items-start gap-4 p-5 bg-dark-surface border ${item.borderColor} hover:border-opacity-60 rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 0% 50%, ${item.color === 'neon-cyan' ? 'rgba(0,245,255,0.06)' : 'rgba(180,0,255,0.06)'}, transparent 60%)` }}
                />
                <div className={`w-11 h-11 rounded-xl ${item.bgColor} border ${item.borderColor} flex items-center justify-center flex-shrink-0 ${item.textColor} relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <div className="relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono mb-1">{item.label}</p>
                  <p className={`font-semibold text-base ${item.textColor} group-hover:underline`}>{item.value}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{item.sub}</p>
                </div>
              </a>
            ))}

            {/* Response time badge */}
            <div className="flex items-center gap-3 px-5 py-4 bg-dark-surface border border-dark-border rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center flex-shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-neon-green animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-bold text-neon-green/80">System online</p>
                <p className="text-xs text-gray-600">Aktywny — odpowiadam na bieżąco</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-dark-surface border border-dark-border rounded-2xl overflow-hidden">
            <div className="h-px bg-gradient-gaming opacity-30" />
            <div className="p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono mb-5">Często zadawane pytania</p>
              <div className="space-y-5">
                {faq.map((item, i) => (
                  <div key={i} className="group">
                    <p className="text-sm font-semibold text-gray-200 mb-1 group-hover:text-neon-cyan transition-colors duration-200">{item.q}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.a}</p>
                    {i < faq.length - 1 && <div className="mt-5 border-t border-dark-border/60" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative p-8 bg-dark-surface border border-neon-cyan/20 rounded-2xl text-center overflow-hidden">
          <div className="absolute inset-0 bg-neon-cyan/3" />
          <div className="h-px absolute top-0 left-0 right-0 bg-gradient-gaming opacity-50" />
          <div className="relative">
            <p className="font-display text-lg font-bold text-gray-100 mb-2">
              Masz własny projekt do wydruku?
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Wyślij link do modelu, wybierz materiał i kolor — a my zajmiemy się resztą.
            </p>
            <Link href="/order">
              <Button className="btn-shine">Zamów wydruk 3D →</Button>
            </Link>
          </div>
        </div>

        <p className="text-center text-gray-700 text-xs font-mono mt-8 cursor-blink">
          $ ping {SITE_NAME.toLowerCase()}.store
        </p>
      </div>
    </div>
  )
}
