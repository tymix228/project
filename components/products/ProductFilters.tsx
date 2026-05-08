'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { CATEGORIES, TAGS, SORT_OPTIONS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategory = searchParams.get('category') || ''
  const currentTag      = searchParams.get('tag')      || ''
  const currentSort     = searchParams.get('sort')     || ''
  const currentSearch   = searchParams.get('search')   || ''

  const [searchValue, setSearchValue] = useState(currentSearch)

  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`/products?${params.toString()}`)
    },
    [router, searchParams]
  )

  // Debounce wyszukiwania — odczekaj 400ms po ostatnim klawiszu
  useEffect(() => {
    const timer = setTimeout(() => {
      setParam('search', searchValue)
    }, 400)
    return () => clearTimeout(timer)
  }, [searchValue]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-6">
      {/* Wyszukiwarka */}
      <div>
        <input
          type="text"
          placeholder="Szukaj produktów..."
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg text-sm bg-dark-bg border border-dark-border text-gray-100 placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/50 transition-all"
        />
      </div>

      {/* Kategorie */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Kategoria
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setParam('category', '')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
              !currentCategory
                ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40'
                : 'bg-dark-surface text-gray-400 border border-dark-border hover:border-neon-cyan/30'
            )}
          >
            Wszystkie
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setParam('category', cat.value)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5',
                currentCategory === cat.value
                  ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40'
                  : 'bg-dark-surface text-gray-400 border border-dark-border hover:border-neon-cyan/30'
              )}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tagi */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Tagi
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setParam('tag', '')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
              !currentTag
                ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40'
                : 'bg-dark-surface text-gray-400 border border-dark-border hover:border-neon-cyan/30'
            )}
          >
            Wszystkie
          </button>
          {TAGS.map(tag => (
            <button
              key={tag.value}
              onClick={() => setParam('tag', tag.value)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
                currentTag === tag.value
                  ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40'
                  : 'bg-dark-surface text-gray-400 border border-dark-border hover:border-neon-cyan/30'
              )}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sortowanie */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Sortuj
        </h3>
        <select
          value={currentSort}
          onChange={e => setParam('sort', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg text-sm bg-dark-surface border border-dark-border text-gray-300 focus:outline-none focus:border-neon-cyan"
        >
          <option value="">Domyślne</option>
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
