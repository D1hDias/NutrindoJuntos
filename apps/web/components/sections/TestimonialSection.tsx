'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { GraduationCap, Star } from 'lucide-react'
import type { GoogleReview } from '@/lib/google-reviews'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface TestimonialSectionProps {
  reviews?: GoogleReview[]
}

// Ícone do Google para indicar origem
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

export function TestimonialSection({ reviews }: TestimonialSectionProps) {
  // Fallback para dados mock se nenhum review for passado
  const testimonials: GoogleReview[] = reviews && reviews.length > 0
    ? reviews
    : [
        {
          id: 1,
          name: 'Ana Paula Silva',
          role: 'Avaliação Google',
          text: 'Os cursos da Nutrindo Juntos transformaram minha prática clínica. O conteúdo é atual, baseado em evidências e com aplicação prática imediata. Recomendo para todos os nutricionistas que querem se destacar no mercado.',
          image: '/images/testimonial/testimonial-1-1.webp',
          rating: 5,
        },
        {
          id: 2,
          name: 'Mariana Costa',
          role: 'Avaliação Google',
          text: 'Como estudante, os cursos me deram uma visão muito além da graduação. A didática é excelente e o suporte da equipe é incrível. Sinto que estou muito mais preparada para o mercado de trabalho.',
          image: '/images/testimonial/testimonial-1-2.webp',
          rating: 5,
        },
        {
          id: 3,
          name: 'Carlos Eduardo Santos',
          role: 'Avaliação Google',
          text: 'A plataforma oferece conteúdo de altíssima qualidade com professores referência no mercado. As aulas são objetivas e o material de apoio é completo. Melhor investimento que fiz na minha carreira.',
          image: '/images/testimonial/testimonial-1-3.webp',
          rating: 5,
        },
      ]

  return (
    <section className="relative block pt-16 pb-[120px]" style={{ backgroundColor: 'rgba(64, 61, 253, 0.04)' }}>
      {/* Shapes decorativas */}
      <div className="absolute left-[95px] bottom-[90px] z-0 animate-float-bob-x">
        <Image
          src="/images/shapes/testimonial-one-shape-1.webp"
          alt=""
          width={200}
          height={200}
          className="w-auto opacity-10"
        />
      </div>
      <div className="absolute top-[130px] right-[310px] z-0">
        <Image
          src="/images/shapes/testimonial-one-shape-2.webp"
          alt=""
          width={200}
          height={200}
          className="w-auto opacity-10"
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="section-title text-left mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-3 w-3 rounded-full bg-primary-500" />
            <span className="font-serif text-lg font-semibold text-graphite">Depoimentos</span>
            <GoogleIcon className="h-5 w-5 ml-1" />
          </div>
          <h2 className="font-display text-4xl font-bold text-graphite lg:text-5xl">
          <span className="text-primary-500">Histórias reais</span> de quem já iniciou a jornada{' '}
          </h2>
        </div>

        {/* Swiper Carousel */}
        <div className="relative testimonial-carousel-wrapper xl:mr-[190px] xl:ml-[109px]">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: '.testimonial-prev',
              nextEl: '.testimonial-next'
            }}
            pagination={{
              el: '.testimonial-pagination',
              clickable: true
            }}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            loop={true}
            speed={600}
            className="testimonial-swiper"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-[80px] px-8 lg:px-12">
                  {/* Image Circle */}
                  <div className="testimonial-img-wrapper flex-shrink-0">
                    <div className="relative w-[305px] h-[305px] rounded-full border border-dashed border-graphite flex items-center justify-center">
                      <div className="relative w-[273px] h-[273px] rounded-full overflow-hidden bg-neutral-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={273}
                          height={273}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            // Fallback se a foto do Google não carregar
                            const target = e.target as HTMLImageElement
                            target.src = '/images/testimonial/default-avatar.webp'
                          }}
                        />
                      </div>
                      <div className="absolute top-[13px] left-[-13px] w-[65px] h-[65px] flex items-center justify-center bg-primary-500 border-2 border-white rounded-full">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-5">
                      <h3 className="text-2xl font-bold text-graphite mb-1">{item.name}</h3>
                      <p className="text-base text-neutral-600 flex items-center gap-1.5">
                        <GoogleIcon className="h-4 w-4" />
                        {item.role}
                      </p>
                    </div>
                    <p className="text-xl lg:text-2xl leading-8 lg:leading-9 font-serif italic text-graphite mb-5">
                      {item.text}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-4">
                      <ul className="flex gap-[5px] bg-white border border-neutral-200 rounded-[21px] px-[19px] py-[11px]">
                        {[...Array(5)].map((_, i) => (
                          <li key={i}>
                            <Star className={`w-4 h-4 ${i < item.rating ? 'fill-[#FFC224] text-[#FFC224]' : 'fill-[#6B778B] text-[#6B778B]'}`} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation vertical à direita - Desktop only */}
          <div className="hidden xl:flex absolute right-[-190px] top-1/2 -translate-y-1/2 flex-col gap-[160px] z-10">
            <button
              className="testimonial-prev w-12 h-12 flex items-center justify-center bg-white border border-neutral-200 rounded-full hover:bg-primary-500 hover:text-white transition-colors"
              aria-label="Depoimento anterior"
            >
              ↑
            </button>
            <button
              className="testimonial-next w-12 h-12 flex items-center justify-center bg-white border border-neutral-200 rounded-full hover:bg-primary-500 hover:text-white transition-colors"
              aria-label="Próximo depoimento"
            >
              ↓
            </button>
          </div>

          {/* Pagination vertical à direita - Desktop only */}
          <div className="testimonial-pagination hidden xl:flex absolute right-[-182px] top-1/2 -translate-y-1/2 flex-col gap-4 z-10"></div>
        </div>
      </div>
    </section>
  )
}
