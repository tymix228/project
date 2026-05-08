'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SITE_NAME } from '@/lib/constants'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Złe hasło. Spróbuj ponownie.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-neon-cyan/4 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-neon-purple/5 blur-[100px] pointer-events-none" />
      <div className="scan-line-overlay absolute inset-0 pointer-events-none" />

      {/* Corner accents */}
      <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-neon-cyan/20" />
      <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-neon-cyan/20" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-neon-cyan/10" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-neon-cyan/10" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-5">
            <div
              className="w-16 h-16 rounded-2xl bg-gradient-gaming flex items-center justify-center text-white font-bold text-2xl font-display float-animation"
              style={{ boxShadow: '0 0 40px rgba(0,245,255,0.3), 0 0 80px rgba(180,0,255,0.15)' }}
            >
              NF
            </div>
            <div className="absolute -inset-2 rounded-3xl bg-neon-cyan/10 blur-md animate-pulse" />
          </div>
          <h1 className="font-display text-2xl font-bold gradient-text mb-1">{SITE_NAME}</h1>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan text-[10px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            PANEL ADMINISTRATORA
          </div>
        </div>

        {/* Card */}
        <div className="relative bg-dark-surface border border-dark-border rounded-2xl overflow-hidden">
          <div className="h-px bg-gradient-gaming opacity-60" />

          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <div className="text-center mb-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono">Dostęp zastrzeżony</p>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono mb-2">
                Hasło dostępu
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-gray-200 placeholder-gray-700 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 transition-all duration-200 font-mono"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neon-red/10 border border-neon-red/20 text-neon-red text-xs font-mono">
                <span>✕</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-shine relative w-full py-3 rounded-xl bg-gradient-gaming text-white font-semibold text-sm hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Weryfikacja...
                </span>
              ) : (
                'Zaloguj → '
              )}
            </button>
          </form>

          <div className="px-8 pb-5 text-center">
            <p className="text-[10px] text-gray-700 font-mono cursor-blink">$ sudo access --admin</p>
          </div>
        </div>
      </div>
    </div>
  )
}
