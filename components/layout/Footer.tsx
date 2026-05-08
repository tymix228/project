import Link from 'next/link'
import { SITE_NAME } from '@/lib/constants'

const footerLinks = [
  {
    title: 'Sklep',
    links: [
      { label: 'Wszystkie produkty', href: '/products' },
      { label: 'Figurki',            href: '/products?category=figurines' },
      { label: 'Akcesoria',          href: '/products?category=accessories' },
      { label: 'Cosplay',            href: '/products?category=cosplay' },
      { label: 'Teren RPG',          href: '/products?category=terrain' },
      { label: 'Elektronika',        href: '/products?category=electronics' },
    ],
  },
  {
    title: 'Informacje',
    links: [
      { label: 'Mój koszyk', href: '/cart' },
      { label: 'Kontakt',    href: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-dark-border bg-dark-surface mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-lg bg-gradient-gaming flex items-center justify-center text-white font-bold font-display">
                NF
              </span>
              <span className="font-display font-bold text-xl gradient-text">{SITE_NAME}</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Precyzyjny druk 3D dla graczy, twórców i miłośników futurystycznego designu.
              Każdy produkt tworzony z pasją.
            </p>
          </div>

          {/* Linki */}
          {footerLinks.map(section => (
            <div key={section.title}>
              <h3 className="font-display font-semibold text-sm text-gray-300 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-neon-cyan transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Dół */}
        <div className="border-t border-dark-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} {SITE_NAME}. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span>Stworzone z</span>
            <span className="text-neon-cyan">❤</span>
            <span>i drukiem 3D</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
