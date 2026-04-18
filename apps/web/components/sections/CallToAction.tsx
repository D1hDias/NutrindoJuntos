import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CallToActionProps {
  title: string
  description: string
  primaryCta: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
  variant?: 'default' | 'gradient'
  className?: string
}

export function CallToAction({
  title,
  description,
  primaryCta,
  secondaryCta,
  variant = 'default',
  className,
}: CallToActionProps) {
  return (
    <section
      className={cn(
        'rounded-2xl p-12 text-center',
        variant === 'gradient'
          ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-white'
          : 'bg-muted',
        className
      )}
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{title}</h2>
        <p
          className={cn(
            'mb-8 text-lg md:text-xl',
            variant === 'gradient' ? 'text-white/90' : 'text-muted-foreground'
          )}
        >
          {description}
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            variant={variant === 'gradient' ? 'secondary' : 'default'}
            asChild
          >
            <Link href={primaryCta.href}>{primaryCta.text}</Link>
          </Button>

          {secondaryCta && (
            <Button
              size="lg"
              variant={variant === 'gradient' ? 'outline' : 'outline'}
              asChild
              className={variant === 'gradient' ? 'border-white text-white hover:bg-white/10' : ''}
            >
              <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
