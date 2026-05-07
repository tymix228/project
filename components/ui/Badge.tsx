import { cn } from '@/lib/utils'
import type { ProductTag } from '@/types'

interface BadgeProps {
  tag: ProductTag
  className?: string
}

const tagConfig: Record<ProductTag, { label: string; className: string }> = {
  bestseller: {
    label: 'Bestseller',
    className: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40',
  },
  new: {
    label: 'Nowość',
    className: 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40',
  },
  sale: {
    label: 'Promocja',
    className: 'bg-neon-red/20 text-neon-red border border-neon-red/40',
  },
  limited: {
    label: 'Limitowana',
    className: 'bg-neon-purple/20 text-neon-purple border border-neon-purple/40',
  },
  featured: {
    label: 'Polecana',
    className: 'bg-neon-green/20 text-neon-green border border-neon-green/40',
  },
}

export default function Badge({ tag, className }: BadgeProps) {
  const config = tagConfig[tag]
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}
