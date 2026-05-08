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

const socials = [
  {
    title: 'Discord',
    href: '#',
    hoverClass: 'hover:text-indigo-400 hover:border-indigo-500/40 hover:bg-indigo-500/5',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.114 18.1.13 18.11a19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    title: 'GitHub',
    href: '#',
    hoverClass: 'hover:text-gray-200 hover:border-gray-500/40 hover:bg-gray-500/5',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    title: 'Email',
    href: 'mailto:tymonbx@gmail.com',
    hoverClass: 'hover:text-neon-cyan hover:border-neon-cyan/40 hover:bg-neon-cyan/5',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67zM22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
      </svg>
    ),
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
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-5">
              Precyzyjny druk 3D dla graczy, twórców i miłośników futurystycznego designu.
              Każdy produkt tworzony z pasją i dbałością o detal.
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['PLA+', 'PETG', 'Resin', '0.1mm'].map(tech => (
                <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-mono text-neon-cyan/70 border border-neon-cyan/15 bg-neon-cyan/5">
                  {tech}
                </span>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-700 font-mono mb-3">
                Znajdź nas
              </p>
              <div className="flex items-center gap-2">
                {socials.map(s => (
                  <a
                    key={s.title}
                    href={s.href}
                    title={s.title}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center border border-dark-border text-gray-600 transition-all duration-200 ${s.hoverClass}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
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
