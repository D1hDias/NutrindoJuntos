'use client'

import { useState } from 'react'
import { Download, FileText, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'

interface CertificateButtonProps {
  courseTitle?: string
  className?: string
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export default function CertificateButton({ 
  courseTitle = 'curso',
  className,
  variant = 'default',
  size = 'default'
}: CertificateButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    setIsLoading(true)
    
    try {
      // Obter token JWT do localStorage ou cookie
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      
      if (!token) {
        toast({
          title: 'Erro de Autenticação',
          description: 'Faça login para baixar seu certificado.',
          variant: 'destructive'
        })
        return
      }

      const response = await fetch('/api/certificado', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        
        if (response.status === 401) {
          toast({
            title: 'Acesso Negado',
            description: 'Sua sessão expirou. Faça login novamente.',
            variant: 'destructive'
          })
          return
        }
        
        if (response.status === 404) {
          toast({
            title: 'Curso Não Concluído',
            description: 'Complete todas as aulas do curso antes de baixar o certificado.',
            variant: 'destructive'
          })
          return
        }

        throw new Error(errorData.error || `Erro ${response.status}`)
      }

      // Converter resposta em blob
      const blob = await response.blob()
      
      if (blob.size === 0) {
        throw new Error('Arquivo de certificado vazio')
      }

      // Criar URL temporária para download
      const url = URL.createObjectURL(blob)
      
      // Criar link temporário e disparar download
      const link = document.createElement('a')
      link.href = url
      link.download = `certificado-${courseTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`
      link.style.display = 'none'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Limpar URL temporária
      URL.revokeObjectURL(url)

      toast({
        title: 'Certificado Baixado!',
        description: 'Seu certificado foi baixado com sucesso.',
      })

    } catch (error) {
      console.error('Erro ao baixar certificado:', error)
      
      toast({
        title: 'Erro no Download',
        description: error instanceof Error ? error.message : 'Erro desconhecido ao baixar certificado.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading}
      variant={variant}
      size={size}
      className={className}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Download className="mr-2 h-4 w-4" />
      )}
      {isLoading ? 'Gerando...' : 'Baixar Certificado'}
    </Button>
  )
}

// Componente alternativo com ícone de arquivo
export function CertificateButtonFile({ 
  courseTitle,
  className,
  ...props 
}: CertificateButtonProps) {
  return (
    <CertificateButton
      {...props}
      courseTitle={courseTitle}
      className={className}
    />
  )
}

// Componente compacto apenas com ícone
export function CertificateButtonIcon({ 
  courseTitle,
  className,
  ...props 
}: CertificateButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    setIsLoading(true)
    
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      
      if (!token) {
        toast({
          title: 'Erro de Autenticação',
          description: 'Faça login para baixar seu certificado.',
          variant: 'destructive'
        })
        return
      }

      const response = await fetch('/api/certificado', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (!response.ok) {
        if (response.status === 404) {
          toast({
            title: 'Curso Não Concluído',
            description: 'Complete o curso primeiro.',
            variant: 'destructive'
          })
          return
        }
        throw new Error('Erro ao baixar certificado')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `certificado-${courseTitle?.replace(/[^a-z0-9]/gi, '-').toLowerCase() || 'curso'}.pdf`
      link.click()
      URL.revokeObjectURL(url)

      toast({
        title: 'Certificado Baixado!',
        description: 'Download concluído com sucesso.',
      })

    } catch (error) {
      toast({
        title: 'Erro no Download',
        description: 'Tente novamente em alguns instantes.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading}
      variant={props.variant || 'outline'}
      size="icon"
      className={className}
      title="Baixar Certificado"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <FileText className="h-4 w-4" />
      )}
    </Button>
  )
}