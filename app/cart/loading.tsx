export default function CartLoading() {
  return (
    <div className="min-h-screen bg-dark-bg py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="skeleton h-4 w-16 rounded-full mb-3" />
          <div className="skeleton h-8 w-40 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4 bg-dark-surface border border-dark-border rounded-2xl p-4">
                <div className="skeleton w-20 h-20 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-4 w-3/4 rounded-lg" />
                  <div className="skeleton h-3 w-1/4 rounded-lg" />
                  <div className="skeleton h-5 w-20 rounded-lg" />
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="skeleton w-7 h-7 rounded-lg" />
                  <div className="skeleton w-28 h-9 rounded-xl" />
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-dark-surface border border-dark-border rounded-2xl overflow-hidden">
              <div className="skeleton h-px w-full" />
              <div className="px-6 py-4 border-b border-dark-border">
                <div className="skeleton h-4 w-28 rounded-lg" />
              </div>
              <div className="p-6 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="skeleton h-3 w-32 rounded" />
                    <div className="skeleton h-3 w-16 rounded" />
                  </div>
                ))}
                <div className="border-t border-dark-border pt-4">
                  <div className="skeleton h-8 w-28 rounded-xl ml-auto" />
                </div>
                <div className="skeleton h-11 w-full rounded-xl" />
                <div className="skeleton h-9 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
