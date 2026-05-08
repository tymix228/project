'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { CATEGORIES, TAGS, SORT_OPTIONS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function ProductFilters() {
  const router      = useRouter()
  const searchParams = useSearchParams()

  const currentCategory = searchParams.get('category') || ''
  const currentTag      = searchParams.get('tag')      || ''
  const currentSort     = searchParams.get('sort')     || ''
  const currentSearch   = searchParams.get('search')   || ''

  const [searchValue, setSearchValue] = useState(currentSearch)

  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) { params.set(key, value) } else { params.delete(key) }
      router.push(`/products?${params.toString()}`)
    },
    [router, searchParams]
  )

  useEffect(() => {
    const timer = setTimeout(() => { setParam('search', searchValue) }, 400)
    return () => clearTimeout(timer)
  }, [searchValue]) // eslint-disable-line react-hooks/exhaustive-deps

  const hasFilters = currentCategory || currentTag || currentSearch || currentSort

  return (
    <div className="space-y-7">

      {/* Reset filtrów */}
      {hasFilters && (
        <button
          onClick={() => { setSearchValue(''); router.push('/products') }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-mono text-neon-red border border-neon-red/30 bg-neon-red/5 hover:bg-neon-red/10 transition-all duration-200"
        >
          <span>✕</span> Wyczyść filtry
        </button>
      )}

      {/* Wyszukiwarka */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono mb-2">
          Szukaj
        </label>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Szukaj..."
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-dark-bg border border-dark-border text-gray-200 placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 transition-all duration-200"
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-neon-red transition-colors text-xs"
            >✕</button>
          )}
        </div>
      </div>

      {/* Kategorie */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono mb-3">
          Kategoria
        </label>
        <div className="space-y-1">
          <button
            onClick={() => setParam('category', '')}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200',
              !currentCategory
                ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30'
                : 'text-gray-400 hover:text-gray-200 hover:bg-dark-bg border border-transparent'
            )}
          >
            <span className="text-base">🌐</span>
            Wszystkie
            {!currentCategory && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-cyan" />}
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setParam('category', cat.value)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200',
                currentCategory === cat.value
                  ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-dark-bg border border-transparent'
              )}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.label}
              {currentCategory === cat.value && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-cyan" />}
            </button>
          ))}
        </div>
      </div>

      {/* Tagi */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono mb-3">
          Tagi
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setParam('tag', '')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all duration-200',
              !currentTag
                ? 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30'
                : 'text-gray-500 border-dark-border hover:border-gray-600 hover:text-gray-300'
            )}
          >
            Wszystkie
          </button>
          {TAGS.map(tag => (
            <button
              key={tag.value}
              onClick={() => setParam('tag', tag.value)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all duration-200',
                currentTag === tag.value
                  ? 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30'
                  : 'text-gray-500 border-dark-border hover:border-gray-600 hover:text-gray-300'
              )}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sortowanie */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono mb-2">
          Sortowanie
        </label>
        <div className="space-y-1">
          <button
            onClick={() => setParam('sort', '')}
            className={cn(
              'w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all duration-200',
              !currentSort
                ? 'text-neon-cyan bg-neon-cyan/8 border border-neon-cyan/20'
                : 'text-gray-500 hover:text-gray-300 border border-transparent'
            )}
          >
            <span className="text-sm">↕</span> Domyślne
          </button>
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setParam('sort', opt.value)}
              className={cn(
                'w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all duration-200',
                currentSort === opt.value
                  ? 'text-neon-cyan bg-neon-cyan/8 border border-neon-cyan/20'
                  : 'text-gray-500 hover:text-gray-300 border border-transparent'
              )}
            >
              <span className="text-sm">
                {opt.value.includes('asc') ? '↑' : opt.value.includes('desc') ? '↓' : '↕'}
              </span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
