export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-dark-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <div className="skeleton h-3 w-16 rounded" />
          <span className="text-gray-700">/</span>
          <div className="skeleton h-3 w-20 rounded" />
          <span className="text-gray-700">/</span>
          <div className="skeleton h-3 w-32 rounded" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image skeleton */}
          <div className="space-y-3">
            <div className="skeleton aspect-square rounded-2xl" />
          </div>

          {/* Info skeleton */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="skeleton h-5 w-20 rounded-full" />
              <div className="skeleton h-5 w-16 rounded-full" />
            </div>
            <div className="skeleton h-3 w-24 rounded" />
            <div className="skeleton h-9 w-3/4 rounded-xl" />
            <div className="skeleton h-9 w-2/3 rounded-xl" />
            <div className="space-y-2">
              <div className="skeleton h-4 w-full rounded" />
              <div className="skeleton h-4 w-full rounded" />
              <div className="skeleton h-4 w-2/3 rounded" />
            </div>
            <div className="skeleton h-24 w-full rounded-xl mt-4" />
            <div className="skeleton h-14 w-full rounded-xl mt-2" />
          </div>
        </div>
      </div>
    </div>
  )
}
