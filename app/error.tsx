'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center gap-8 px-4 bg-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full bg-neon-red/4 blur-[80px]" />

      <div className="relative text-center max-w-md">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-red/30 bg-neon-red/8 text-neon-red text-xs font-mono mb-6">
          <span className="w-2 h-2 rounded-full bg-neon-red animate-pulse" />
          BŁĄD SYSTEMU
        </div>

        <h1
          className="font-display font-black text-6xl mb-4"
          style={{
            background: 'linear-gradient(135deg, #FF0044, #B400FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          500
        </h1>

        <h2 className="font-display text-xl font-bold text-gray-200 mb-2">Coś poszło nie tak</h2>
        <p className="text-gray-500 text-sm mb-8">
          Wystąpił nieoczekiwany błąd. Spróbuj ponownie lub wróć do strony głównej.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={reset}>Spróbuj ponownie</Button>
          <Link href="/"><Button variant="secondary">← Strona główna</Button></Link>
        </div>

        <p className="text-gray-700 text-xs font-mono mt-8 cursor-blink">
          $ error.digest: {error.digest || 'unknown'}
        </p>
      </div>
    </div>
  )
}
