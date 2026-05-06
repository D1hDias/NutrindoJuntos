/**
 * PAYMENT FORMATTERS
 */

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatInstallment(total: number, installments: number): string {
  const value = total / installments
  return `${installments}x de ${formatCurrency(value)}`
}

export function parseCurrency(value: string): number {
  return parseFloat(value.replace(/[R$\s.]/g, '').replace(',', '.'))
}
