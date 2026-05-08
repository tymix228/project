const items = [
  { icon: '🖨️', text: 'Druk 3D FDM' },
  { icon: '⚡', text: 'Realizacja 24h' },
  { icon: '🎮', text: 'Dla Graczy' },
  { icon: '🏆', text: 'Figurki & Kolekcje' },
  { icon: '🦾', text: 'Cosplay & Props' },
  { icon: '🎲', text: 'Teren RPG' },
  { icon: '💡', text: 'Elektronika' },
  { icon: '✨', text: 'Resin Premium' },
  { icon: '🔧', text: 'PLA+ PETG ASA' },
  { icon: '🌐', text: 'NeonForge Store' },
  { icon: '⚙️', text: 'Precyzja 0.1mm' },
  { icon: '📦', text: 'Szybka wysyłka' },
]

export default function MarqueeBanner() {
  const doubled = [...items, ...items]

  return (
    <div className="relative overflow-hidden bg-dark-surface border-y border-dark-border">
      {/* Top & bottom accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-gaming opacity-30" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-gaming opacity-15" />

      {/* Gradient masks on sides */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark-surface to-transparent z-10 pointer-events-none" />

      <div className="py-3.5">
        <div className="marquee-track select-none">
          {doubled.map((item, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2.5 px-6"
            >
              <span
                className="text-sm"
                style={{ filter: 'drop-shadow(0 0 6px rgba(0,245,255,0.4))' }}
              >
                {item.icon}
              </span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap font-mono">
                {item.text}
              </span>
              <span
                className="ml-4 text-neon-cyan/20 font-mono"
                style={{ textShadow: '0 0 8px rgba(0,245,255,0.6)' }}
              >
                ◆
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
