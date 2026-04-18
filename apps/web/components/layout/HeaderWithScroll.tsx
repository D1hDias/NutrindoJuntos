'use client'

import { usePathname } from 'next/navigation'
import { HeaderServer } from './HeaderServer'

// Função para scroll suave personalizado com animação mais fluida
const scrollToSection = (sectionId: string) => {
  // Caso especial para scroll ao topo
  if (sectionId === 'top') {
    smoothScrollTo(0)
    return
  }
  
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = 0 // Scroll exato para o início da seção
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - headerHeight
    smoothScrollTo(offsetPosition)
  }
}

// Função de scroll personalizada com easing suave
const smoothScrollTo = (targetPosition: number) => {
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  const duration = Math.max(1000, Math.min(2000, Math.abs(distance) * 1.2))
  let start: number | null = null

  // Função de easing (ease-in-out-quart) para transição mais suave
  const easeInOutQuart = (t: number): number => {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
  }

  const animation = (currentTime: number) => {
    if (start === null) start = currentTime
    const timeElapsed = currentTime - start
    const progress = Math.min(timeElapsed / duration, 1)

    // Aplicar easing mais suave para transição mais natural
    const easedProgress = easeInOutQuart(progress)
    const currentPosition = startPosition + (distance * easedProgress)

    window.scrollTo(0, currentPosition)

    if (progress < 1) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}

export function HeaderWithScroll() {
  const pathname = usePathname()

  // Interceptar cliques nos links do menu para aplicar scroll suave
  const handleNavClick = (href: string, sectionId: string) => {
    // Para o botão "Início", sempre rolar para o topo
    if (sectionId === 'top') {
      if (pathname !== '/') {
        // Se não estiver na home, navegar para home
        window.location.href = '/'
      } else {
        // Se estiver na home, rolar para o topo
        scrollToSection('top')
      }
    } else {
      // Para outras seções, navegar para home se necessário
      if (pathname !== '/') {
        window.location.href = '/' + href
      } else {
        scrollToSection(sectionId)
      }
    }
  }

  return (
    <div onClick={(e) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[data-scroll]')
      if (link) {
        e.preventDefault()
        const href = link.getAttribute('href') || ''
        const sectionId = link.getAttribute('data-section') || ''
        handleNavClick(href, sectionId)
      }
    }}>
      <HeaderServer />
    </div>
  )
}