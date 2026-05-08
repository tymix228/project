import { cn } from '@/lib/utils'
import type { ProductTag } from '@/types'

interface BadgeProps {
  tag: ProductTag
  className?: string
}

const tagConfig: Record<ProductTag, { label: string; className: string; pulse?: boolean }> = {
  bestseller: {
    label: 'Bestseller',
    className: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/40',
  },
  new: {
    label: 'Nowość',
    className: 'bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/40',
    pulse: true,
  },
  sale: {
    label: 'Promocja',
    className: 'bg-neon-red/15 text-neon-red border border-neon-red/40',
  },
  limited: {
    label: 'Limitowana',
    className: 'bg-neon-purple/15 text-neon-purple border border-neon-purple/40',
  },
  featured: {
    label: 'Polecana',
    className: 'bg-neon-green/15 text-neon-green border border-neon-green/40',
  },
}

export default function Badge({ tag, className }: BadgeProps) {
  const config = tagConfig[tag]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
        config.className,
        className
      )}
    >
      {config.pulse && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse flex-shrink-0" />
      )}
      {config.label}
    </span>
  )
}
