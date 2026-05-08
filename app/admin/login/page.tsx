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
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-gaming flex items-center justify-center text-white font-bold text-2xl font-display mx-auto mb-4">
            NF
          </div>
          <h1 className="font-display text-2xl font-bold gradient-text">{SITE_NAME}</h1>
          <p className="text-gray-500 text-sm mt-1">Panel Administratora</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-dark-surface border border-dark-border rounded-2xl p-8 space-y-5"
        >
          <h2 className="font-semibold text-gray-200 text-center">Zaloguj się</h2>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Hasło</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Wpisz hasło..."
              required
              className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-gray-200
                         placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50
                         transition-colors duration-200"
            />
          </div>

          {error && (
            <p className="text-sm text-neon-red text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-gaming text-white font-medium
                       hover:opacity-90 active:scale-95 transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logowanie...' : 'Zaloguj →'}
          </button>
        </form>
      </div>
    </div>
  )
}
