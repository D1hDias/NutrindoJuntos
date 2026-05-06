'use client'

import { useState } from 'react'
import { Copy, Check, X, QrCode } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PixModalProps {
  isOpen: boolean
  onClose: () => void
}

const PIX_KEY = 'nutrindojuntosnj@gmail.com'
const WHATSAPP_NUMBER = '5521980082458'
const WHATSAPP_MSG = encodeURIComponent(
  'Acabei de fazer o pagamento da Imersão da WEBDIET – Do Software ao Atendimento e estou enviando o comprovante abaixo:'
)

export function PixModal({ isOpen, onClose }: PixModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  function handleCopy() {
    navigator.clipboard.writeText(PIX_KEY)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-2xl bg-primary-600 px-6 py-4">
          <div className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-white" />
            <span className="font-semibold text-white">Pagamento via PIX</span>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 transition-colors hover:text-white"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 p-6">
          {/* Valor */}
          <div className="rounded-xl bg-primary-50 py-4 text-center">
            <p className="text-sm font-medium text-primary-700">Valor com desconto PIX</p>
            <p className="mt-1 font-display text-4xl font-bold text-primary-600">R$ 120,00</p>
            <p className="mt-1 text-xs text-primary-500">à vista — desconto exclusivo</p>
          </div>

          {/* Chave PIX */}
          <div>
            <p className="mb-2 text-sm font-semibold text-neutral-700">Chave PIX (e-mail)</p>
            <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3">
              <span className="flex-1 select-all font-mono text-sm text-neutral-800">
                {PIX_KEY}
              </span>
              <button
                onClick={handleCopy}
                className="shrink-0 rounded-md p-1.5 text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-700"
                aria-label="Copiar chave PIX"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
            {copied && (
              <p className="mt-1 text-xs text-green-600">Chave copiada!</p>
            )}
          </div>

          {/* Instruções */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            <p className="font-semibold">Após o pagamento:</p>
            <p className="mt-1">
              Envie o comprovante pelo WhatsApp para confirmarmos sua vaga.
            </p>
          </div>

          {/* Botão WhatsApp */}
          <Button
            size="lg"
            className="w-full bg-green-600 font-semibold text-white hover:bg-green-700"
            asChild
          >
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Enviar Comprovante no WhatsApp
            </a>
          </Button>

          <p className="text-center text-xs text-neutral-400">
            Clique fora ou no X para fechar
          </p>
        </div>
      </div>
    </div>
  )
}
