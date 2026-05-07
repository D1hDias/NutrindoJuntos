import Image from 'next/image'

const WHATSAPP_LIGA = 'https://wa.me/5521980082458?text=Ol%C3%A1%21+Quero+entrar+na+comunidade+LIGA+Nutrindo+Juntos%21'

const PILARES = [
  { emoji: '🎓', label: 'Conhecimento' },
  { emoji: '🤝', label: 'Conexão' },
  { emoji: '📈', label: 'Evolução' },
]

const BENEFICIOS = [
  'Conteúdos práticos e atualizações',
  'Materiais de apoio e artigos científicos',
  'Aulões ao vivo mensais com vagas limitadas',
  'Oportunidades e condições especiais',
  'Sorteios e experiências exclusivas',
]

export function NewsletterSection() {
  return (
    <section className="newsletter-one relative block pb-16 z-1">
      <div className="container mx-auto px-4">
        <div
          className="newsletter-one__inner relative block rounded-[40px] text-center py-10 px-6 md:py-[60px] md:px-10 overflow-hidden z-1"
          style={{ background: 'linear-gradient(90deg, #4A4A4A 0%, #6B6B6B 50%, #8C8C8C 100%)' }}
        >
          {/* Background Shape */}
          <div className="newsletter-one__bg-shape absolute inset-0 z-0" style={{ filter: 'grayscale(1) brightness(1.3) opacity(0.5)' }}>
            <Image
              src="/images/shapes/newsletter-one-bg-shape.webp"
              alt=""
              fill
              quality={75}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>

          {/* Decorative Shape 1 */}
          <div className="newsletter-one__shape-1 absolute left-0 bottom-0 z-0" style={{ filter: 'grayscale(1) brightness(1.3) opacity(0.5)' }}>
            <Image
              src="/images/shapes/newsletter-one-shape-1.webp"
              alt=""
              width={150}
              height={150}
              className="w-auto opacity-[0.19]"
            />
          </div>

          {/* Decorative Shape 2 */}
          <div className="newsletter-one__shape-2 absolute right-[50px] bottom-[55px] z-0" style={{ filter: 'grayscale(1) brightness(1.3) opacity(0.5)' }}>
            <Image
              src="/images/shapes/newsletter-one-shape-2.webp"
              alt=""
              width={100}
              height={100}
              className="w-auto"
            />
          </div>

          {/* Badge */}
          <div className="relative z-10 mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90">
            🔒 Grupo fechado — qualidade garantida
          </div>

          {/* Título */}
          <h2
            className="newsletter-one__title relative z-10 text-5xl md:text-[80px] font-semibold leading-tight md:leading-[80px] text-transparent mb-4"
            style={{ WebkitTextStroke: '2px white' }}
          >
            A LIGA
          </h2>

          <p className="relative z-10 text-xl md:text-2xl font-medium text-white/90 mb-2">
            Comunidade Acadêmica Nutrindo Juntos
          </p>

          {/* Pilares */}
          <div className="relative z-10 mt-6 mb-8 flex flex-wrap justify-center gap-4">
            {PILARES.map(({ emoji, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white"
              >
                <span>{emoji}</span>
                {label}
              </div>
            ))}
          </div>

          {/* Descrição */}
          <p className="relative z-10 mx-auto mb-6 max-w-2xl text-lg leading-relaxed text-white/85">
            Um espaço exclusivo para estudantes e profissionais da saúde que querem ir além da faculdade.
          </p>

          {/* Benefícios */}
          <ul className="relative z-10 mx-auto mb-10 max-w-xl space-y-2 text-left">
            {BENEFICIOS.map((item) => (
              <li key={item} className="flex items-start gap-2 text-white/90 text-sm md:text-base">
                <span className="mt-0.5 shrink-0 text-green-400">✔️</span>
                {item}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="relative z-10">
            <a
              href={WHATSAPP_LIGA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-[40px] bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl hover:-translate-y-0.5"
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Quero fazer parte da LIGA
            </a>

            <p className="mt-4 text-sm text-white/60">
              🏅 Fique por aqui e aproveite tudo que preparamos para a sua evolução profissional
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
