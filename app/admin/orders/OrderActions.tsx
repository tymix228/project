'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const STATUS_OPTIONS = [
  { value: 'nowe',         label: 'Nowe',         cls: 'text-neon-cyan  border-neon-cyan/40  bg-neon-cyan/10'  },
  { value: 'w_realizacji', label: 'W realizacji', cls: 'text-yellow-400 border-yellow-500/40 bg-yellow-500/10' },
  { value: 'zrealizowane', label: 'Zrealizowane', cls: 'text-neon-green border-neon-green/40 bg-neon-green/10' },
]

interface Props {
  orderId: number
  currentStatus: string
  email: string
}

export default function OrderActions({ orderId, currentStatus, email }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function updateStatus(status: string) {
    if (status === currentStatus) return
    setLoading(true)
    try {
      const res = await fetch(`/api/order/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        toast.success('Status zaktualizowany')
        router.refresh()
      } else {
        toast.error('Błąd aktualizacji statusu')
      }
    } finally {
      setLoading(false)
    }
  }

  async function deleteOrder() {
    if (!confirm('Na pewno usunąć to zamówienie?')) return
    setLoading(true)
    try {
      const res = await fetch(`/api/order/${orderId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (res.ok) {
        toast.success('Zamówienie usunięte')
        router.refresh()
      } else {
        toast.error('Błąd usuwania zamówienia')
      }
    } finally {
      setLoading(false)
    }
  }

  const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(email)}&su=${encodeURIComponent('Odpowiedź na zamówienie wydruku 3D')}`

  return (
    <div className="mt-4 pt-4 border-t border-dark-border flex flex-wrap items-center gap-2">
      <span className="text-xs text-gray-500 mr-1">Status:</span>
      {STATUS_OPTIONS.map(opt => (
        <button
          key={opt.value}
          onClick={() => updateStatus(opt.value)}
          disabled={loading}
          className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200 disabled:opacity-60 ${
            currentStatus === opt.value
              ? opt.cls + ' cursor-default'
              : 'text-gray-500 border-dark-border hover:border-gray-500 cursor-pointer'
          }`}
        >
          {currentStatus === opt.value && '● '}{opt.label}
        </button>
      ))}

      <div className="flex-1" />

      <a
        href={gmailUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-gaming text-white text-xs font-medium hover:opacity-90 transition-all"
      >
        ✉️ Odpowiedz w Gmail
      </a>

      <button
        onClick={deleteOrder}
        disabled={loading}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neon-red/40 text-neon-red text-xs font-medium hover:bg-neon-red hover:text-white transition-all duration-200 disabled:opacity-50"
      >
        🗑 Usuń
      </button>
    </div>
  )
}
