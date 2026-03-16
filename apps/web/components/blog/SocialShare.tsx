'use client'

import { Facebook, Twitter, Linkedin, Link2, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

interface SocialShareProps {
  url: string
  title: string
  description?: string
}

export function SocialShare({ url, title, description }: SocialShareProps) {
  const { toast } = useToast()

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description || title}\n\n${url}`)}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast({
        title: 'Link copiado!',
        description: 'O link foi copiado para a área de transferência.',
      })
    } catch (error) {
      toast({
        title: 'Erro ao copiar',
        description: 'Não foi possível copiar o link.',
        variant: 'destructive',
      })
    }
  }

  const openShareWindow = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400')
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">
        Compartilhar:
      </span>

      <Button
        variant="outline"
        size="icon"
        onClick={() => openShareWindow(shareUrls.twitter)}
        aria-label="Compartilhar no Twitter"
        className="h-9 w-9"
      >
        <Twitter className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => openShareWindow(shareUrls.facebook)}
        aria-label="Compartilhar no Facebook"
        className="h-9 w-9"
      >
        <Facebook className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => openShareWindow(shareUrls.linkedin)}
        aria-label="Compartilhar no LinkedIn"
        className="h-9 w-9"
      >
        <Linkedin className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => window.location.href = shareUrls.email}
        aria-label="Compartilhar por email"
        className="h-9 w-9"
      >
        <Mail className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={copyToClipboard}
        aria-label="Copiar link"
        className="h-9 w-9"
      >
        <Link2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
