'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, fullWidth, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base
          'relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none',
          'focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:ring-offset-2 focus:ring-offset-dark-bg',
          'disabled:opacity-50 disabled:cursor-not-allowed',

          // Variants
          variant === 'primary' && [
            'bg-gradient-gaming text-white',
            'hover:shadow-neon-cyan hover:scale-105 active:scale-95',
          ],
          variant === 'secondary' && [
            'bg-dark-card border border-neon-cyan/30 text-neon-cyan',
            'hover:border-neon-cyan hover:shadow-neon-cyan hover:scale-105 active:scale-95',
          ],
          variant === 'ghost' && [
            'bg-transparent text-neon-cyan',
            'hover:bg-neon-cyan/10 active:scale-95',
          ],
          variant === 'danger' && [
            'bg-neon-red/10 border border-neon-red/40 text-neon-red',
            'hover:bg-neon-red hover:text-white hover:scale-105 active:scale-95',
          ],
          variant === 'outline' && [
            'bg-transparent border border-dark-border text-gray-300',
            'hover:border-neon-cyan/50 hover:text-neon-cyan active:scale-95',
          ],

          // Sizes
          size === 'sm' && 'text-sm px-3 py-1.5 gap-1.5',
          size === 'md' && 'text-sm px-5 py-2.5 gap-2',
          size === 'lg' && 'text-base px-8 py-3.5 gap-2.5',

          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </span>
        )}
        <span className={isLoading ? 'invisible' : 'flex items-center gap-2'}>
          {children}
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
