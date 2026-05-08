'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
      { label: 'Zamów wydruk',  href: '/order' },
      { label: 'Mój koszyk',   href: '/cart' },
      { label: 'Kontakt',      href: '/contact' },
    ],
  },
]

export default function Footer() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null

  return (
    <footer className="relative mt-auto border-t border-dark-border overflow-hidden">
      {/* Gradient top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />

      {/* Background grid */}
      <div className="absolute inset-0 bg-dark-surface grid-bg opacity-50" />

      {/* Orb tło */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-neon-cyan/3 blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-gaming flex items-center justify-center text-white font-bold font-display text-sm shadow-neon-cyan-sm group-hover:shadow-neon-cyan transition-shadow duration-300">
                NF
              </div>
              <span className="font-display font-bold text-xl gradient-text">
                {SITE_NAME}
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
              Precyzyjny druk 3D dla graczy, twórców i miłośników futurystycznego designu.
              Każdy produkt tworzony z pasją i dbałością o detal.
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2">
              {['PLA+', 'PETG', 'Resin', '0.1mm'].map(tech => (
                <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-mono text-neon-cyan/70 border border-neon-cyan/15 bg-neon-cyan/5">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Linki */}
          {footerLinks.map(section => (
            <div key={section.title}>
              <h3 className="font-display font-bold text-xs text-gray-400 uppercase tracking-widest mb-5">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-neon-cyan transition-colors duration-200 flex items-center gap-1 group/link"
                    >
                      <span className="w-0 group-hover/link:w-2 overflow-hidden transition-all duration-200 text-neon-cyan text-xs">→</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Dół — separator + copyright */}
        <div className="border-t border-dark-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-700 font-mono">
            © {new Date().getFullYear()} {SITE_NAME} — Wszelkie prawa zastrzeżone
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            <span>System online</span>
            <span className="mx-1 text-gray-800">·</span>
            <span>Druk 3D dla graczy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
