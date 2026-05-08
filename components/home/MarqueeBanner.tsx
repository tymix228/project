const items = [
  { icon: '🖨️', text: 'Druk 3D FDM' },
  { icon: '⚡', text: 'Realizacja 24h' },
  { icon: '🎮', text: 'Dla Graczy' },
  { icon: '🏆', text: 'Figurki i Kolekcje' },
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
    <div className="relative overflow-hidden py-3 bg-dark-surface border-y border-dark-border">
      {/* Gradient maski po bokach */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark-surface to-transparent z-10 pointer-events-none" />

      {/* Track */}
      <div className="marquee-track select-none">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-2 px-6 text-xs font-mono"
          >
            <span className="text-base">{item.icon}</span>
            <span className="text-gray-500 uppercase tracking-widest whitespace-nowrap">
              {item.text}
            </span>
            <span className="ml-4 text-neon-cyan/30">◆</span>
          </div>
        ))}
      </div>
    </div>
  )
}
