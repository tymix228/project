'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', toggle, { passive: true })
    return () => window.removeEventListener('scroll', toggle)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Wróć na górę"
      className={cn(
        'fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50',
        'w-10 h-10 rounded-xl',
        'bg-dark-surface border border-neon-cyan/30 text-neon-cyan',
        'flex items-center justify-center',
        'hover:bg-neon-cyan/10 hover:border-neon-cyan hover:shadow-neon-cyan-sm',
        'transition-all duration-300 active:scale-95',
        'animate-zoom-in'
      )}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  )
}
