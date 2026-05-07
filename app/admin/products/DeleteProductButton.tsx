'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Button from '@/components/ui/Button'

interface Props {
  productId: string
  productName: string
}

export default function DeleteProductButton({ productId, productName }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm(`Czy na pewno chcesz usunąć "${productName}"? Tej akcji nie można cofnąć.`)) {
      return
    }

    setLoading(true)
    try {
      // Autoryzacja przez cookie sesji (ustawiane automatycznie przy logowaniu)
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (res.ok) {
        toast.success('Produkt usunięty')
        router.refresh()
      } else {
        const data = await res.json()
        toast.error(data.error || 'Błąd usuwania')
      }
    } catch {
      toast.error('Błąd połączenia')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="danger" size="sm" isLoading={loading} onClick={handleDelete}>
      Usuń
    </Button>
  )
}
