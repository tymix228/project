import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductById } from '@/lib/products'
import ProductForm from '@/components/admin/ProductForm'
import Button from '@/components/ui/Button'

export default function EditProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  if (!product) notFound()

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products">
          <Button variant="ghost" size="sm">← Wróć</Button>
        </Link>
        <div>
          <h1 className="font-display text-2xl font-bold gradient-text">Edytuj produkt</h1>
          <p className="text-gray-500 text-sm mt-1 text-xs font-mono">{product.name}</p>
        </div>
      </div>
      <ProductForm product={product} />
    </div>
  )
}
