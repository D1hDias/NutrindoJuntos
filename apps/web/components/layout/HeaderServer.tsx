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
              <div className="flex gap-2">
                {/* Placeholder para social links futuros */}
                <span className="text-xs opacity-75">Instagram | LinkedIn</span>
              </div>
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