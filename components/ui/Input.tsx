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
          <label htmlFor={id} className="text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full px-4 py-2.5 rounded-lg text-sm transition-all duration-200',
            'bg-dark-surface border border-dark-border text-gray-100 placeholder-gray-500',
            'focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/50',
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
