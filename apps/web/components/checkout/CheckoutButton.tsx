'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { Product } from '@/lib/payments/common/types'

interface CheckoutButtonProps {
  product: Product
  label?: string
  className?: string
  variant?: 'default' | 'outline' | 'secondary'
}

export function CheckoutButton({
  product,
  label = 'Comprar agora',
  className,
  variant = 'default',
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCheckout() {
    setLoading(true)
    setError(null)

    try {
      const orderId = crypto.randomUUID()

      const res = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, orderId }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message ?? 'Erro ao iniciar checkout')
        return
      }

      window.location.href = data.checkoutUrl
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={handleCheckout}
        disabled={loading}
        variant={variant}
        className={className}
      >
        {loading ? 'Aguarde...' : label}
      </Button>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}
