'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { GraduationCap, Star, Linkedin, Share2 } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Testimonial {
  id: number
  name: string
  role: string
  text: string
  image: string
  rating: number
  social: {
    linkedin?: string
    pinterest?: string
  }
}

export function TestimonialSection() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Ana Paula Silva',
      role: 'Nutricionista Esportiva',
      text: 'Os cursos da Nutrindo Juntos transformaram minha prática clínica. O conteúdo é atual, baseado em evidências e com aplicação prática imediata. Recomendo para todos os nutricionistas que querem se destacar no mercado.',
      image: '/images/testimonial/testimonial-1-1.webp',
      rating: 5,
      social: { linkedin: '#', pinterest: '#' }
    },
    {
      id: 2,
      name: 'Mariana Costa',
      role: 'Estudante de Nutrição',
      text: 'Como estudante, os cursos me deram uma visão muito além da graduação. A didática é excelente e o suporte da equipe é incrível. Sinto que estou muito mais preparada para o mercado de trabalho.',
      image: '/images/testimonial/testimonial-1-2.webp',
      rating: 5,
      social: { linkedin: '#', pinterest: '#' }
    },
    {
      id: 3,
      name: 'Carlos Eduardo Santos',
      role: 'Nutricionista Clínico',
      text: 'A plataforma oferece conteúdo de altíssima qualidade com professores referência no mercado. As aulas são objetivas e o material de apoio é completo. Melhor investimento que fiz na minha carreira.',
      image: '/images/testimonial/testimonial-1-3.webp',
      rating: 5,
      social: { linkedin: '#', pinterest: '#' }
    }
  ]

  return (
    <section className="relative block py-[120px]" style={{ backgroundColor: 'rgba(64, 61, 253, 0.04)' }}>
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
                      <div className="relative w-[273px] h-[273px] rounded-full overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={273}
                          height={273}
                          className="object-cover"
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
                      <p className="text-base text-neutral-600">{item.role}</p>
                    </div>
                    <p className="text-xl lg:text-2xl leading-8 lg:leading-9 font-serif italic text-graphite mb-5">
                      {item.text}
                    </p>

                    {/* Rating + Social */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <ul className="flex gap-[5px] bg-white border border-neutral-200 rounded-[21px] px-[19px] py-[11px]">
                        {[...Array(5)].map((_, i) => (
                          <li key={i}>
                            <Star className={`w-4 h-4 ${i < item.rating ? 'fill-[#FFC224] text-[#FFC224]' : 'fill-[#6B778B] text-[#6B778B]'}`} />
                          </li>
                        ))}
                      </ul>
                      <div className="flex gap-2">
                        <a
                          href={item.social.linkedin}
                          className="w-10 h-10 flex items-center justify-center bg-white border border-neutral-200 rounded-full hover:bg-primary-500 hover:text-white transition-colors"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                        <a
                          href={item.social.pinterest}
                          className="w-10 h-10 flex items-center justify-center bg-white border border-neutral-200 rounded-full hover:bg-primary-500 hover:text-white transition-colors"
                          aria-label="Pinterest"
                        >
                          <Share2 className="w-4 h-4" />
                        </a>
                      </div>
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
