import Link from 'next/link'
import ProductForm from '@/components/admin/ProductForm'
import Button from '@/components/ui/Button'

export default function NewProductPage() {
  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products">
          <Button variant="ghost" size="sm">← Wróć</Button>
        </Link>
        <div>
          <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest mb-1">Admin / Produkty / Nowy</p>
          <h1 className="font-display text-2xl font-bold gradient-text">Nowy produkt</h1>
          <p className="text-gray-500 text-sm mt-1">Wypełnij formularz aby dodać produkt do sklepu</p>
        </div>
      </div>
      <ProductForm />
    </div>
  )
}
