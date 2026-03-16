'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface PhoneInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, value, ...props }, ref) => {
    const formatPhone = (val: string) => {
      // Remove tudo que não é número
      const numbers = val.replace(/\D/g, '')

      // Limita a 11 dígitos
      const limited = numbers.substring(0, 11)

      // Aplica a máscara
      if (limited.length <= 2) {
        return limited
      } else if (limited.length <= 7) {
        return `(${limited.slice(0, 2)}) ${limited.slice(2)}`
      } else {
        return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhone(e.target.value)
      e.target.value = formatted
      onChange?.(e)
    }

    return (
      <input
        {...props}
        ref={ref}
        type="tel"
        value={value}
        onChange={handleChange}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
      />
    )
  }
)

PhoneInput.displayName = 'PhoneInput'

export { PhoneInput }
