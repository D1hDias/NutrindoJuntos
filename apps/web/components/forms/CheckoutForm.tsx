'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, Clock, Copy, CreditCard, QrCode } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

// Schema de validação
const checkoutSchema = z.object({
  email: z.string().email('E-mail inválido'),
  cpf: z.string()
    .min(11, 'CPF deve ter 11 dígitos')
    .max(14, 'CPF deve ter no máximo 14 caracteres')
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => val.length === 11, 'CPF deve ter 11 dígitos'),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

interface CheckoutFormProps {
  courseId: string
  courseTitle: string
  price: number // em centavos
  onSuccess?: (accessKey: string) => void
}

interface CheckoutResponse {
  orderId: string
  pixQrCode: string
  pixCode: string
  paymentId: string
  value: number
  dueDate: string
  course: {
    id: string
    title: string
  }
}

interface OrderStatus {
  id: string
  status: 'pending' | 'paid' | 'cancelled' | 'expired'
  accessKey?: string
  paidAt?: string
}

export default function CheckoutForm({ 
  courseId, 
  courseTitle, 
  price, 
  onSuccess 
}: CheckoutFormProps) {
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form')
  const [loading, setLoading] = useState(false)
  const [checkoutData, setCheckoutData] = useState<CheckoutResponse | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema)
  })

  const cpfValue = watch('cpf')

  // Formatação do CPF em tempo real
  useEffect(() => {
    if (cpfValue) {
      const formatted = cpfValue
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
      setValue('cpf', formatted, { shouldValidate: false })
    }
  }, [cpfValue, setValue])

  // Timer para expiração do PIX
  useEffect(() => {
    if (checkoutData && step === 'payment') {
      const dueTime = new Date(checkoutData.dueDate).getTime()
      const now = Date.now()
      const remaining = Math.max(0, dueTime - now)
      
      setTimeLeft(Math.floor(remaining / 1000))
      
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setStep('form')
            toast({
              title: 'PIX Expirado',
              description: 'O PIX expirou. Gere um novo para continuar.',
              variant: 'destructive'
            })
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [checkoutData, step])

  // Polling para verificar status do pagamento
  useEffect(() => {
    if (checkoutData && step === 'payment') {
      const interval = setInterval(async () => {
        try {
          const response = await fetch(`/api/checkout/status/${checkoutData.orderId}`)
          if (response.ok) {
            const status: OrderStatus = await response.json()
            
            if (status.status === 'paid') {
              setStep('success')
              setPollingInterval(null)
              toast({
                title: 'Pagamento Confirmado!',
                description: 'Seu acesso ao curso foi liberado.',
              })
              
              if (status.accessKey && onSuccess) {
                onSuccess(status.accessKey)
              }
            }
          }
        } catch (error) {
          console.error('Erro ao verificar status:', error)
        }
      }, 3000)

      setPollingInterval(interval)
      return () => {
        clearInterval(interval)
        setPollingInterval(null)
      }
    }
  }, [checkoutData, step, onSuccess])

  const onSubmit = async (data: CheckoutFormData) => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/checkout/asaas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          cpf: data.cpf.replace(/\D/g, ''),
          courseId,
          priceCents: price
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao processar pagamento')
      }

      const checkoutResult: CheckoutResponse = await response.json()
      setCheckoutData(checkoutResult)
      setStep('payment')
      
      toast({
        title: 'PIX Gerado!',
        description: 'Escaneie o QR Code ou copie o código PIX para pagar.',
      })
      
    } catch (error) {
      console.error('Erro no checkout:', error)
      toast({
        title: 'Erro no Checkout',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const copyPixCode = () => {
    if (checkoutData?.pixCode) {
      navigator.clipboard.writeText(checkoutData.pixCode)
      toast({
        title: 'Código Copiado!',
        description: 'Cole no seu app do banco para pagar.',
      })
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    }
    return `${minutes}m ${secs}s`
  }

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(cents / 100)
  }

  if (step === 'form') {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Finalizar Compra
          </CardTitle>
          <CardDescription>
            Complete seus dados para gerar o PIX
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* Resumo do Curso */}
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium text-sm text-muted-foreground">Curso</h3>
              <p className="font-semibold">{courseTitle}</p>
              <p className="text-lg font-bold text-primary mt-2">
                {formatPrice(price)}
              </p>
            </div>

            <Separator />

            {/* Campos do Formulário */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  maxLength={14}
                  {...register('cpf')}
                  className={errors.cpf ? 'border-red-500' : ''}
                />
                {errors.cpf && (
                  <p className="text-sm text-red-500 mt-1">{errors.cpf.message}</p>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Gerando PIX...' : `Pagar ${formatPrice(price)}`}
            </Button>
          </CardFooter>
        </form>
      </Card>
    )
  }

  if (step === 'payment' && checkoutData) {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <QrCode className="w-5 h-5" />
            Pagar com PIX
          </CardTitle>
          <CardDescription>
            Escaneie o QR Code ou copie o código PIX
          </CardDescription>
          
          {timeLeft > 0 && (
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                Expira em: <strong>{formatTime(timeLeft)}</strong>
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* QR Code */}
          {checkoutData.pixQrCode && (
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg border">
                <img 
                  src={checkoutData.pixQrCode} 
                  alt="QR Code PIX"
                  className="w-48 h-48 mx-auto"
                />
              </div>
            </div>
          )}

          {/* Código PIX */}
          {checkoutData.pixCode && (
            <div>
              <Label className="text-sm font-medium">Código PIX (Copia e Cola)</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={checkoutData.pixCode}
                  readOnly
                  className="font-mono text-xs"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={copyPixCode}
                  className="flex-shrink-0"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Informações do Pagamento */}
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Curso:</span>
              <span className="text-sm font-medium">{checkoutData.course.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Valor:</span>
              <span className="text-sm font-bold">{formatPrice(price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Status:</span>
              <span className="text-sm text-yellow-600 font-medium">Aguardando pagamento</span>
            </div>
          </div>

          <Alert>
            <Clock className="h-4 w-4" />
            <AlertDescription>
              Após o pagamento, seu acesso será liberado automaticamente em alguns segundos.
            </AlertDescription>
          </Alert>
        </CardContent>

        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setStep('form')
              if (pollingInterval) {
                clearInterval(pollingInterval)
                setPollingInterval(null)
              }
            }}
          >
            Voltar
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (step === 'success') {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-green-600">Pagamento Confirmado!</CardTitle>
          <CardDescription>
            Seu acesso ao curso foi liberado com sucesso
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800">
              {courseTitle}
            </h3>
            <p className="text-sm text-green-600 mt-1">
              Acesso liberado • Válido por 12 meses
            </p>
          </div>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Em breve você receberá um e-mail com suas credenciais de acesso e instruções para acessar o curso.
            </AlertDescription>
          </Alert>
        </CardContent>

        <CardFooter>
          <Button 
            className="w-full"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.href = '/area-aluno'
              }
            }}
          >
            Acessar Área do Aluno
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return null
}