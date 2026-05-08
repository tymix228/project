'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'

interface ImageUploadProps {
  images: string[]
  onChange: (images: string[]) => void
}

export default function ImageUpload({ images, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const uploaded: string[] = []

    for (const file of Array.from(files)) {
      try {
        const form = new FormData()
        form.append('file', file)

        const res = await fetch('/api/upload', {
          method: 'POST',
          credentials: 'include',
          body: form,
        })

        const data = await res.json()
        if (res.ok) {
          uploaded.push(data.url)
        } else {
          toast.error(data.error || 'Błąd uploadu')
        }
      } catch {
        toast.error('Błąd przesyłania pliku')
      }
    }

    if (uploaded.length > 0) {
      onChange([...images, ...uploaded])
      toast.success(`Przesłano ${uploaded.length} zdjęcie(a)`)
    }

    setUploading(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index))
  }

  return (
    <div>
      {/* Miniatury */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-4">
          {images.map((img, i) => (
            <div key={i} className="relative group">
              <div className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                i === 0 ? 'border-neon-cyan/50 shadow-neon-cyan-sm' : 'border-dark-border hover:border-neon-cyan/30'
              }`}>
                <Image src={img} alt={`Zdjęcie ${i + 1}`} fill className="object-cover" sizes="80px" />
              </div>
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-neon-red text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-neon-red"
              >
                ✕
              </button>
              {i === 0 && (
                <span className="absolute bottom-0 left-0 right-0 text-center text-[9px] bg-neon-cyan/80 text-dark-bg font-bold py-0.5">
                  Główne
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Strefa uploadu */}
      <label className="group flex flex-col items-center justify-center gap-2 w-full h-32 border-2 border-dashed border-dark-border rounded-xl cursor-pointer hover:border-neon-cyan/40 hover:bg-neon-cyan/3 transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg-dense opacity-0 group-hover:opacity-30 transition-opacity" />
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-neon-cyan relative z-10">
            <div className="w-6 h-6 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin" />
            <span className="text-xs font-mono">Przesyłanie...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-dark-bg border border-dark-border flex items-center justify-center group-hover:border-neon-cyan/30 transition-colors">
              <svg className="w-5 h-5 text-gray-600 group-hover:text-neon-cyan transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">Kliknij aby wybrać zdjęcia</span>
            <span className="text-[10px] text-gray-700 font-mono">JPG, PNG, WebP — max 5MB</span>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleUpload}
          className="sr-only"
          disabled={uploading}
        />
      </label>
    </div>
  )
}
