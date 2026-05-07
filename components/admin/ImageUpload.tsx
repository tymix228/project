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

        // Autoryzacja przez cookie sesji (credentials: 'include')
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
      <p className="text-sm font-medium text-gray-300 mb-3">Zdjęcia produktu</p>

      {/* Miniatury */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-4">
          {images.map((img, i) => (
            <div key={i} className="relative group">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-dark-border">
                <Image src={img} alt={`Zdjęcie ${i + 1}`} fill className="object-cover" sizes="80px" />
              </div>
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-neon-red text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
              {i === 0 && (
                <span className="absolute bottom-0 left-0 right-0 text-center text-[9px] bg-dark-bg/80 text-neon-cyan py-0.5">
                  Główne
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Strefa uploadu */}
      <label className="flex flex-col items-center justify-center gap-2 w-full h-28 border-2 border-dashed border-dark-border rounded-xl cursor-pointer hover:border-neon-cyan/50 hover:bg-neon-cyan/5 transition-all duration-200">
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-neon-cyan">
            <div className="w-6 h-6 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin" />
            <span className="text-xs">Przesyłanie...</span>
          </div>
        ) : (
          <>
            <span className="text-2xl">📷</span>
            <span className="text-xs text-gray-500">Kliknij aby wybrać zdjęcia</span>
            <span className="text-[10px] text-gray-600">JPG, PNG, WebP — max 5MB</span>
          </>
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
