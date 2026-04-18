'use client'

import { forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'

export interface EmailInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onValidationChange?: (isValid: boolean) => void
}

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ className, onValidationChange, onBlur, ...props }, ref) => {
    const [error, setError] = useState<string>('')
    const [touched, setTouched] = useState(false)

    const validateEmail = (email: string) => {
      if (!email) {
        setError('')
        onValidationChange?.(false)
        return
      }

      // Check for @ symbol
      if (!email.includes('@')) {
        setError('Email deve conter @')
        onValidationChange?.(false)
        return
      }

      // Check for domain
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setError('Email inválido. Ex: nome@exemplo.com')
        onValidationChange?.(false)
        return
      }

      // Check for common TLDs
      const validTLDs = ['.com', '.com.br', '.br', '.net', '.org', '.edu', '.gov']
      const hasValidTLD = validTLDs.some(tld => email.toLowerCase().endsWith(tld))

      if (!hasValidTLD) {
        setError('Domínio inválido. Use .com, .com.br, etc.')
        onValidationChange?.(false)
        return
      }

      setError('')
      onValidationChange?.(true)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setTouched(true)
      validateEmail(e.target.value)
      onBlur?.(e)
    }

    return (
      <div className="w-full">
        <input
          {...props}
          ref={ref}
          type="email"
          onBlur={handleBlur}
          onChange={(e) => {
            props.onChange?.(e)
            if (touched) {
              validateEmail(e.target.value)
            }
          }}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error && touched && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
        />
        {error && touched && (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

EmailInput.displayName = 'EmailInput'

export { EmailInput }
