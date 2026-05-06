import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { Mail, Phone } from 'lucide-react'

// Server-safe header sem dependências do browser
export function HeaderServer() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      {/* Top Bar Roxa - Exatamente como no HeaderNew original */}
      <div 
        className="text-white h-12"
        style={{
          backgroundColor: '#6d4d88' // Roxo Lavanda do manual da marca
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
                <span>(21) 98008-2458</span>
              </Link>
            </div>

            {/* Promo Text - Centro */}
            <div className="hidden flex-1 justify-center md:flex">
              <span className="text-center">
                🎓 Transforme sua carreira em nutrição conosco
              </span>
            </div>

            {/* Social Links ou CTA */}
            <div className="hidden items-center gap-4 md:flex">
              <span className="text-xs opacity-90">Siga-nos:</span>
              <a
                href="https://www.instagram.com.br/nutrindo.juntos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium transition-colors hover:bg-white/20"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @nutrindo.juntos
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo className="h-12 w-auto" />
          </div>

          {/* Navigation - Com scroll suave para seções da home */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              href="#top"
              data-scroll="true"
              data-section="top"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Início
            </Link>
            <Link 
              href="#sobre-nos"
              data-scroll="true"
              data-section="sobre-nos"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Sobre Nós
            </Link>
            <Link 
              href="#cursos"
              data-scroll="true"
              data-section="cursos"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Cursos
            </Link>
            <Link
              href="#equipe"
              data-scroll="true"
              data-section="equipe"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Equipe
            </Link>
            <Link 
              href="#contato"
              data-scroll="true"
              data-section="contato"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Contato
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex">
            <Button asChild>
              <Link href="/cursos">
                Ver Cursos
              </Link>
            </Button>
          </div>

          {/* Mobile menu button - handled by client component */}
          <div className="lg:hidden">
            <Button variant="ghost" size="icon">
              <span className="sr-only">Menu</span>
              ☰
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}