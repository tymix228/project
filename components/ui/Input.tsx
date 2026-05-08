import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-[10px] font-bold uppercase tracking-widest text-gray-600 font-mono">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-200',
            'bg-dark-bg border border-dark-border text-gray-200 placeholder-gray-600',
            'focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20',
            error && 'border-neon-red focus:border-neon-red focus:ring-neon-red/50',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-neon-red">{error}</p>}
        {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
