export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header skeleton */}
        <div className="mb-10">
          <div className="skeleton h-5 w-16 rounded-full mb-4" />
          <div className="skeleton h-10 w-64 rounded-xl mb-2" />
          <div className="skeleton h-4 w-32 rounded-lg" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar skeleton */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-5 space-y-4">
              <div className="skeleton h-4 w-20 rounded-lg" />
              <div className="skeleton h-10 w-full rounded-xl" />
              <div className="space-y-2 mt-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="skeleton h-9 w-full rounded-xl" />
                ))}
              </div>
            </div>
          </aside>

          {/* Grid skeleton */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-dark-surface border border-dark-border rounded-2xl overflow-hidden">
                  <div className="skeleton aspect-square" />
                  <div className="p-4 space-y-2">
                    <div className="skeleton h-3 w-16 rounded" />
                    <div className="skeleton h-4 w-full rounded" />
                    <div className="skeleton h-4 w-3/4 rounded" />
                    <div className="flex justify-between items-center mt-3">
                      <div className="skeleton h-5 w-16 rounded" />
                      <div className="skeleton h-8 w-20 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
