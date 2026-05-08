import Link from 'next/link'

export default function DziekujemyPage() {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="font-display text-2xl font-bold gradient-text mb-3">Zamówienie wysłane!</h1>
        <p className="text-gray-400 mb-8">
          Dostałem Twoje zgłoszenie. Odezwę się na podany adres e-mail z wyceną i terminem realizacji w ciągu 24h.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-gradient-gaming text-white font-medium text-sm hover:opacity-90 transition-all"
        >
          ← Wróć na stronę główną
        </Link>
      </div>
    </div>
  )
}
