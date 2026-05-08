export default function HomeLoading() {
  return (
    <div className="min-h-[90vh] bg-dark-bg flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative flex flex-col items-center gap-5">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-gaming flex items-center justify-center text-white font-bold text-2xl font-display float-animation"
            style={{ boxShadow: '0 0 40px rgba(0,245,255,0.3)' }}>
            NF
          </div>
          <div className="absolute -inset-2 rounded-3xl bg-neon-cyan/10 blur-md animate-pulse" />
        </div>
        <div className="w-8 h-8 border-2 border-dark-border border-t-neon-cyan rounded-full animate-spin" />
        <p className="text-xs text-gray-600 font-mono animate-pulse">Ładowanie...</p>
      </div>
    </div>
  )
}
