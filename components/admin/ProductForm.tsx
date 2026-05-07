'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { productFormSchema, type ProductFormValues } from '@/lib/validations'
import { CATEGORIES, TAGS } from '@/lib/constants'
import type { Product } from '@/types'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ImageUpload from './ImageUpload'

interface ProductFormProps {
  product?: Product  // jeśli podano — tryb edycji
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const [images, setImages] = useState<string[]>(product?.images || [])
  const [isLoading, setIsLoading] = useState(false)

  const isEditing = !!product

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: product
      ? {
          name:             product.name,
          shortDescription: product.shortDescription,
          description:      product.description,
          price:            product.price / 100,
          compareAtPrice:   product.compareAtPrice ? product.compareAtPrice / 100 : undefined,
          category:         product.category,
          tags:             product.tags,
          material:         product.material,
          printTime:        product.printTime,
          stock:            product.stock,
          isActive:         product.isActive,
          isFeatured:       product.isFeatured,
        }
      : {
          isActive:   true,
          isFeatured: false,
          tags:       [],
          stock:      0,
        },
  })

  const selectedTags = watch('tags') || []

  function toggleTag(tag: ProductFormValues['tags'][number]) {
    const current = watch('tags') || []
    if (current.includes(tag)) {
      setValue('tags', current.filter(t => t !== tag))
    } else {
      setValue('tags', [...current, tag])
    }
  }

  async function onSubmit(data: ProductFormValues) {
    setIsLoading(true)
    try {
      const payload = { ...data, images }
      const url    = isEditing ? `/api/products/${product.id}` : '/api/products'
      const method = isEditing ? 'PUT' : 'POST'

      // Autoryzacja przez cookie sesji (ustawiane automatycznie po zalogowaniu)
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })

      const json = await res.json()

      if (res.ok) {
        toast.success(isEditing ? 'Produkt zaktualizowany!' : 'Produkt dodany!')
        router.push('/admin/products')
        router.refresh()
      } else {
        toast.error(json.error || 'Wystąpił błąd')
      }
    } catch {
      toast.error('Błąd połączenia z serwerem')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

      {/* Upload zdjęć */}
      <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
        <h2 className="font-semibold text-gray-200 mb-5">Zdjęcia</h2>
        <ImageUpload images={images} onChange={setImages} />
      </div>

      {/* Podstawowe informacje */}
      <div className="bg-dark-surface border border-dark-border rounded-xl p-6 space-y-5">
        <h2 className="font-semibold text-gray-200">Podstawowe informacje</h2>

        <Input
          label="Nazwa produktu *"
          placeholder="np. Cyberpunk Skull Figurine"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Krótki opis (do 160 znaków) *"
          placeholder="Jedno zdanie opisujące produkt..."
          error={errors.shortDescription?.message}
          {...register('shortDescription')}
        />

        <div>
          <label className="text-sm font-medium text-gray-300 block mb-1.5">Pełny opis *</label>
          <textarea
            rows={5}
            placeholder="Szczegółowy opis produktu..."
            className="w-full px-4 py-2.5 rounded-lg text-sm bg-dark-bg border border-dark-border text-gray-100 placeholder-gray-500 focus:outline-none focus:border-neon-cyan resize-none"
            {...register('description')}
          />
          {errors.description && (
            <p className="text-xs text-neon-red mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300 block mb-2">Kategoria *</label>
          <select
            className="w-full px-4 py-2.5 rounded-lg text-sm bg-dark-bg border border-dark-border text-gray-200 focus:outline-none focus:border-neon-cyan"
            {...register('category')}
          >
            <option value="">Wybierz kategorię...</option>
            {CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-xs text-neon-red mt-1">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300 block mb-2">Tagi</label>
          <div className="flex flex-wrap gap-2">
            {TAGS.map(tag => (
              <button
                key={tag.value}
                type="button"
                onClick={() => toggleTag(tag.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                  selectedTags.includes(tag.value)
                    ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan'
                    : 'border-dark-border text-gray-500 hover:border-neon-cyan/30'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ceny i magazyn */}
      <div className="bg-dark-surface border border-dark-border rounded-xl p-6 space-y-5">
        <h2 className="font-semibold text-gray-200">Ceny i magazyn</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Cena (PLN) *"
            type="number"
            step="0.01"
            min="0"
            placeholder="99.00"
            error={errors.price?.message}
            {...register('price', { valueAsNumber: true })}
          />
          <Input
            label="Stara cena (PLN) — opcjonalnie"
            type="number"
            step="0.01"
            min="0"
            placeholder="129.00"
            hint="Wyświetlana jako przekreślona"
            error={errors.compareAtPrice?.message}
            {...register('compareAtPrice', { valueAsNumber: true })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Stan magazynowy *"
            type="number"
            min="0"
            placeholder="10"
            error={errors.stock?.message}
            {...register('stock', { valueAsNumber: true })}
          />
          <Input
            label="Materiał"
            placeholder="PLA+, PETG, Resin..."
            {...register('material')}
          />
          <Input
            label="Czas druku (h)"
            type="number"
            min="0"
            step="0.5"
            placeholder="6"
            {...register('printTime', { valueAsNumber: true })}
          />
        </div>
      </div>

      {/* Widoczność */}
      <div className="bg-dark-surface border border-dark-border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-gray-200">Widoczność</h2>

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded accent-neon-cyan" {...register('isActive')} />
          <div>
            <p className="text-sm font-medium text-gray-200">Aktywny</p>
            <p className="text-xs text-gray-500">Produkt widoczny w sklepie</p>
          </div>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded accent-neon-cyan" {...register('isFeatured')} />
          <div>
            <p className="text-sm font-medium text-gray-200">Polecany</p>
            <p className="text-xs text-gray-500">Wyświetlany na stronie głównej</p>
          </div>
        </label>
      </div>

      {/* Przyciski */}
      <div className="flex items-center justify-end gap-3">
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Anuluj
        </Button>
        <Button type="submit" isLoading={isLoading} size="lg">
          {isEditing ? '💾 Zapisz zmiany' : '+ Dodaj produkt'}
        </Button>
      </div>
    </form>
  )
}
