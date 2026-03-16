'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { cn } from '@/lib/utils'
import { Menu, X, Mail, Phone, Search, ChevronDown } from 'lucide-react'

// Função para scroll suave personalizado com animação mais fluida
const scrollToSection = (sectionId: string) => {
  // Caso especial para scroll ao topo
  if (sectionId === 'top') {
    smoothScrollTo(0)
    return
  }
  
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = 140 // Altura do header sticky
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - headerHeight
    smoothScrollTo(offsetPosition)
  }
}

// Função de scroll personalizada com easing suave
const smoothScrollTo = (targetPosition: number) => {
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  const duration = Math.max(1000, Math.min(2000, Math.abs(distance) * 1.2)) // Duração mais longa para suavidade
  let start: number | null = null

  // Adicionar classe para indicar scroll ativo (opcional)
  document.body.style.pointerEvents = 'none' // Previne clicks durante scroll
  
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
    } else {
      // Restaurar interações quando scroll terminar
      document.body.style.pointerEvents = 'auto'
    }
  }

  requestAnimationFrame(animation)
}

// Tipos para navegação
interface NavigationItem {
  name: string
  href: string
  isScroll?: boolean
  sectionId?: string
  hasDropdown?: boolean
  items?: Array<{ name: string; href: string }>
}

const navigation: NavigationItem[] = [
  { name: 'Início', href: '#top', isScroll: true, sectionId: 'top' },
  { name: 'Sobre Nós', href: '#sobre-nos', isScroll: true, sectionId: 'sobre-nos' },
  { name: 'Cursos', href: '#cursos', isScroll: true, sectionId: 'cursos' },
  { name: 'Blog', href: '#blog', isScroll: true, sectionId: 'blog' },
  { name: 'Contato', href: '#contato', isScroll: true, sectionId: 'contato' },
  // Comentado por enquanto conforme solicitado
  // {
  //   name: 'Serviços',
  //   href: '/cursos',
  //   hasDropdown: true,
  //   items: [
  //     { name: 'Todos os Cursos', href: '/cursos' },
  //     { name: 'Nutrição Clínica', href: '/cursos/categoria/clinica' },
  //     { name: 'Nutrição Esportiva', href: '/cursos/categoria/esportiva' },
  //     { name: 'Nutrição Funcional', href: '/cursos/categoria/funcional' },
  //   ]
  // },
]

export function HeaderNew() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Sticky header ativa após 130px de scroll (igual ao template)
      const scrolled = window.scrollY > 100
      setIsScrolled(scrolled)
    }

    // Executar uma vez ao montar
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'shadow-md' : 'shadow-sm'
      )}
      style={{
        // Background aplicado diretamente no header quando NÃO scrolled
        ...(!isScrolled && {
          backgroundColor: '#f2f2ff'
        }),
        // Background branco quando scrolled
        ...(isScrolled && {
          backgroundColor: '#ffffff'
        })
      }}
    >
      {/* Background Pattern - Espelhado horizontalmente */}
      {!isScrolled && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'url(/images/shapes/banner-one-bg-shape-1.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transform: 'scaleX(-1)', // Espelha apenas o background
            zIndex: -1,
            mixBlendMode: 'multiply'
          }}
        />
      )}

      {/* Top Bar - Inspirado no Figma - Some quando scrolled */}
      <div
        className={cn(
          'text-white transition-all duration-300 overflow-hidden',
          isScrolled ? 'h-0 opacity-0' : 'h-12 opacity-100'
        )}
        style={{
          backgroundColor: '#6d4d88' // Roxo Lavanda sólido (sem gradiente)
        }}
      >
        <div className="container mx-auto px-8">
          <div className="flex h-12 items-center justify-between text-sm">
            {/* Contact Info */}
            <div className="hidden items-center gap-6 md:flex">
              <Link
                href="mailto:contato@nutrindojuntos.com.br"
                className="flex items-center gap-2 transition-colors hover:text-primary-300"
              >
                <Mail className="h-4 w-4" />
                <span>contato@nutrindojuntos.com.br</span>
              </Link>
              <Link
                href="tel:+5511999999999"
                className="flex items-center gap-2 transition-colors hover:text-primary-300"
              >
                <Phone className="h-4 w-4" />
                <span>(11) 99999-9999</span>
              </Link>
            </div>

            {/* Promo Text - Centro */}
            <div className="hidden flex-1 justify-center md:flex">
              <p className="font-medium">
                🎓 Matricule-se agora e ganhe{' '}
                <span className="font-bold text-accent-400">30% de desconto</span>
              </p>
            </div>

            {/* Social & CTA */}
            <div className="flex items-center gap-4">
              {/* Social Icons - Desktop only */}
              <div className="hidden items-center gap-3 md:flex">
                <Link
                  href="https://instagram.com/nutrindojuntos"
                  target="_blank"
                  className="transition-opacity hover:opacity-80"
                  aria-label="Instagram"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </Link>
                <Link
                  href="https://facebook.com/nutrindojuntos"
                  target="_blank"
                  className="transition-opacity hover:opacity-80"
                  aria-label="Facebook"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Link>
              </div>

              {/* Trial Button */}
              <Button
                variant="outline"
                size="sm"
                className="border-accent-400 bg-transparent text-white hover:bg-accent-400 hover:text-secondary-900"
              >
                Teste Grátis
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Inspirado no Figma */}
      <div className="border-b border-neutral-200">
        <nav className="container mx-auto flex h-20 items-center justify-between px-8">
          {/* Logo */}
          <Logo variant="horizontal" width={140} height={47} priority />

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <div key={item.href} className="group relative">
                {item.isScroll ? (
                  <button
                    onClick={() => {
                      // Para o botão "Início", sempre rolar para o topo
                      if (item.sectionId === 'top') {
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
                          window.location.href = '/' + item.href
                        } else {
                          scrollToSection(item.sectionId!)
                        }
                      }
                    }}
                    className={cn(
                      'flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary-500',
                      // Para scroll links, verificar se estamos na página inicial
                      pathname === '/' && item.name !== 'Início'
                        ? 'text-graphite'
                        : pathname === item.href
                        ? 'text-primary-500 font-semibold'
                        : 'text-graphite'
                    )}
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary-500',
                      pathname === item.href || pathname.startsWith(item.href + '/')
                        ? 'text-primary-500 font-semibold'
                        : 'text-graphite'
                    )}
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.hasDropdown && item.items && (
                  <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                    <div className="rounded-lg border border-neutral-200 bg-white p-2 shadow-lg">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block rounded-md px-4 py-2 text-sm text-graphite transition-colors hover:bg-primary-50 hover:text-primary-500"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Search & Sign In */}
          <div className="hidden items-center gap-4 lg:flex">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="search"
                placeholder="Buscar cursos..."
                className="h-10 w-64 rounded-full border border-lavender bg-white pl-4 pr-10 text-sm text-graphite placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
              <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
            </div>

            {/* Sign In Button */}
            <Button
              variant="default"
              className="bg-primary-500 hover:bg-primary-600"
            >
              Entrar
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="text-graphite lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-neutral-200 bg-white lg:hidden">
          <div className="container mx-auto space-y-1 px-4 py-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Buscar cursos..."
                  className="h-10 w-full rounded-full border border-lavender bg-white pl-4 pr-10 text-sm text-graphite placeholder:text-neutral-400"
                />
                <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
              </div>
            </div>

            {/* Mobile Menu Items */}
            {navigation.map((item) => (
              <div key={item.href}>
                {item.isScroll ? (
                  <button
                    onClick={() => {
                      // Para o botão "Início", sempre rolar para o topo
                      if (item.sectionId === 'top') {
                        if (pathname !== '/') {
                          // Se não estiver na home, navegar para home
                          window.location.href = '/'
                        } else {
                          // Se estiver na home, rolar para o topo
                          scrollToSection('top')
                          setMobileMenuOpen(false)
                        }
                      } else {
                        // Para outras seções, navegar para home se necessário
                        if (pathname !== '/') {
                          window.location.href = '/' + item.href
                        } else {
                          scrollToSection(item.sectionId!)
                          setMobileMenuOpen(false)
                        }
                      }
                    }}
                    className={cn(
                      'block w-full text-left rounded-lg px-4 py-3 text-base font-medium transition-colors',
                      pathname === '/' && item.name !== 'Início'
                        ? 'text-graphite hover:bg-neutral-50'
                        : 'text-graphite hover:bg-neutral-50'
                    )}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'block rounded-lg px-4 py-3 text-base font-medium transition-colors',
                      pathname === item.href
                        ? 'bg-primary-50 text-primary-500'
                        : 'text-graphite hover:bg-neutral-50'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
                {/* Mobile Submenu */}
                {item.hasDropdown && item.items && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block rounded-lg px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Actions */}
            <div className="mt-4 space-y-2 pt-4">
              <Button
                variant="default"
                className="w-full bg-primary-500 hover:bg-primary-600"
              >
                Entrar
              </Button>
              <Button
                variant="outline"
                className="w-full border-primary-500 text-primary-500 hover:bg-primary-50"
              >
                Teste Grátis
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
