import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { MAX_UPLOAD_SIZE, ALLOWED_IMAGE_TYPES } from '@/lib/constants'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

async function isAuthorized(request: NextRequest): Promise<boolean> {
  const headerKey = request.headers.get('x-admin-key')
  if (headerKey && headerKey === process.env.ADMIN_KEY) return true
  const session = await getServerSession(authOptions)
  return session?.user?.isAdmin === true
}

// POST /api/upload — upload zdjęcia produktu
export async function POST(request: NextRequest) {
  if (!await isAuthorized(request)) {
    return NextResponse.json({ error: 'Brak uprawnień' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Brak pliku' }, { status: 400 })
    }

    // Sprawdź typ MIME (nie tylko rozszerzenie!)
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Nieprawidłowy typ pliku. Dozwolone: JPG, PNG, WebP' },
        { status: 400 }
      )
    }

    // Sprawdź rozmiar
    if (file.size > MAX_UPLOAD_SIZE) {
      return NextResponse.json(
        { error: 'Plik za duży. Maksymalny rozmiar: 5MB' },
        { status: 413 }
      )
    }

    // Wygeneruj bezpieczną nazwę pliku z timestampem
    const ext = file.type.split('/')[1].replace('jpeg', 'jpg')
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    // Upewnij się że folder istnieje
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'products')
    await mkdir(uploadDir, { recursive: true })

    // Zapisz plik
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(path.join(uploadDir, filename), buffer)

    const url = `/images/products/${filename}`
    return NextResponse.json({ url, message: 'Upload udany' })
  } catch (error) {
    console.error('POST /api/upload error:', error)
    return NextResponse.json({ error: 'Błąd uploadu' }, { status: 500 })
  }
}
