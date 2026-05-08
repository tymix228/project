export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-dark-bg py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <div className="skeleton h-6 w-24 rounded-full mx-auto" />
          <div className="skeleton h-12 w-72 rounded-xl mx-auto" />
          <div className="skeleton h-4 w-80 rounded-lg mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Contact cards */}
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-4 p-5 bg-dark-surface border border-dark-border rounded-2xl">
                <div className="skeleton w-11 h-11 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-3 w-24 rounded" />
                  <div className="skeleton h-5 w-40 rounded-lg" />
                  <div className="skeleton h-3 w-32 rounded" />
                </div>
              </div>
            ))}
            <div className="skeleton h-16 w-full rounded-2xl" />
          </div>

          {/* FAQ */}
          <div className="bg-dark-surface border border-dark-border rounded-2xl overflow-hidden">
            <div className="skeleton h-px w-full" />
            <div className="p-6 space-y-5">
              <div className="skeleton h-3 w-32 rounded" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="skeleton h-4 w-3/4 rounded-lg" />
                  <div className="skeleton h-3 w-full rounded" />
                  <div className="skeleton h-3 w-2/3 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="skeleton h-36 w-full rounded-2xl" />
      </div>
    </div>
  )
}
