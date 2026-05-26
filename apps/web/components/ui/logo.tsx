import Image from 'next/image'
import Link from 'next/link'

export type LogoVariant =
  | 'wordmark'        // 1.png - "JUNTOS" text only
  | 'icon-vertical'   // 3.png - DNA+Leaf vertical icon
  | 'icon-circle'     // 4.png - DNA+Leaf in circle
  | 'horizontal'      // 5.png - Icon + "JUNTOS" horizontal (MAIN)
  | 'vertical'        // 6.png - Icon + "JUNTOS" vertical (full logo)
  | 'icon-only'       // 7.png - DNA+Leaf horizontal icon only

interface LogoProps {
  variant?: LogoVariant
  width?: number
  height?: number
  className?: string
  href?: string
  priority?: boolean
}

const LOGO_FILES: Record<LogoVariant, string> = {
  'wordmark': '/logos/1.png',
  'icon-vertical': '/logos/3.png',
  'icon-circle': '/logos/4.png',
  'horizontal': '/logos/5.png',      // Main logo
  'vertical': '/logos/6.png',
  'icon-only': '/logos/7.png',
}

const LOGO_DIMENSIONS: Record<LogoVariant, { width: number; height: number }> = {
  'wordmark': { width: 200, height: 60 },
  'icon-vertical': { width: 80, height: 120 },
  'icon-circle': { width: 100, height: 100 },
  'horizontal': { width: 180, height: 60 },   // Main logo
  'vertical': { width: 150, height: 100 },
  'icon-only': { width: 120, height: 60 },
}

export function Logo({
  variant = 'horizontal',  // Default to main logo (5.png)
  width,
  height,
  className,
  href = '/',
  priority = false,
}: LogoProps) {
  const logoSrc = LOGO_FILES[variant]
  const dimensions = LOGO_DIMENSIONS[variant]
  const logoWidth = width || dimensions.width
  const logoHeight = height || dimensions.height

  const logoImage = (
    <Image
      src={logoSrc}
      alt="NUTRINDO JUNTOS - Educação em Nutrição"
      width={logoWidth}
      height={logoHeight}
      priority={priority}
      className={className}
    />
  )

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center transition-opacity hover:opacity-80"
        aria-label="NUTRINDO JUNTOS - Página Inicial"
      >
        {logoImage}
      </Link>
    )
  }

  return logoImage
}
