import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createCheckout } from '@/lib/payments/asaas/client'
import { productToCheckoutItem, getMaxInstallments, buildCallbackUrls } from '@/lib/payments/asaas/utils'
import { productSchema } from '@/lib/payments/common/validators'
import { checkRateLimit } from '@/lib/rate-limit'

const checkoutSchema = z.object({
  product: productSchema,
  orderId: z.string().uuid(),
})

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
    const { limited } = checkRateLimit(`checkout:${ip}`, { maxRequests: 10, interval: 60_000 })
    if (limited) {
      return NextResponse.json({ message: 'Muitas tentativas. Tente novamente.' }, { status: 429 })
    }

    const body = await request.json()
    const { product, orderId } = checkoutSchema.parse(body)

    const checkoutUrl = await createCheckout({
      billingTypes: ['PIX', 'CREDIT_CARD', 'BOLETO'],
      chargeTypes: ['DETACHED', 'INSTALLMENT'],
      minutesToExpire: 1440, // 24h
      maxInstallmentCount: getMaxInstallments(),
      callback: buildCallbackUrls(orderId),
      items: [productToCheckoutItem(product)],
    })

    return NextResponse.json({ checkoutUrl: checkoutUrl.checkoutUrl }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Dados inválidos', errors: error.errors }, { status: 400 })
    }
    console.error('[checkout] erro:', error)
    return NextResponse.json({ message: 'Erro ao criar checkout' }, { status: 500 })
  }
}
