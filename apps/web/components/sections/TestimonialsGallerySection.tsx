'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, Grid } from 'swiper/modules'
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/grid'

export interface Testimonial {
  id: string
  image: string
  alt: string
}

export interface VideoTestimonial {
  id: string
  video: string
  thumbnail: string
  alt: string
}

interface TestimonialsGallerySectionProps {
  images?: Testimonial[]
  videos?: VideoTestimonial[]
}

// Dados de exemplo - substituir com dados reais do CMS futuramente
const defaultImages: Testimonial[] = [
  {
    id: '1',
    image: '/images/testimonials/images/exemplo-1.jpg',
    alt: 'Depoimento de cliente'
  },
  {
    id: '2',
    image: '/images/testimonials/images/exemplo-2.jpg',
    alt: 'Depoimento de cliente'
  },
  // Adicione mais conforme necessário
]

const defaultVideos: VideoTestimonial[] = [
  {
    id: 'v1',
    video: '/images/testimonials/videos/exemplo-1.mp4',
    thumbnail: '/images/testimonials/videos/thumb-1.jpg',
    alt: 'Vídeo depoimento de cliente'
  },
  // Adicione mais conforme necessário
]

export function TestimonialsGallerySection({
  images = defaultImages,
  videos = defaultVideos
}: TestimonialsGallerySectionProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [videoPlaying, setVideoPlaying] = useState<string | null>(null)

  const openLightbox = (imageUrl: string) => {
    setSelectedImage(imageUrl)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setSelectedImage(null)
  }

  const playVideo = (videoId: string) => {
    setVideoPlaying(videoId)
  }

  return (
    <section className="relative block pt-16 pb-[120px] bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary-500" />
            <span className="font-serif text-lg font-semibold text-primary-500">
              Depoimentos Reais
            </span>
          </div>
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Histórias de{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Transformação
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Conversas reais de alunos que transformaram suas carreiras com a Nutrindo Juntos.
            Prints autênticos que mostram nosso compromisso com cada estudante.
          </p>
        </div>

        {/* Gallery Grid - Carrossel com múltiplas imagens */}
        {images.length > 0 && (
          <div className="mb-16">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, Grid]}
              spaceBetween={20}
              slidesPerView={2}
              grid={{
                rows: 2,
                fill: 'row'
              }}
              navigation={{
                prevEl: '.swiper-button-prev-custom',
                nextEl: '.swiper-button-next-custom',
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  grid: { rows: 2 }
                },
                768: {
                  slidesPerView: 3,
                  grid: { rows: 2 }
                },
                1024: {
                  slidesPerView: 4,
                  grid: { rows: 2 }
                },
              }}
              className="testimonials-swiper pb-12"
            >
              {images.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer"
                    onClick={() => openLightbox(testimonial.image)}
                  >
                    {/* Imagem */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.alt}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                      />
                    </div>

                    {/* Overlay com ícone de expandir */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/30 group-hover:opacity-100">
                      <div className="rounded-full bg-white p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <svg
                          className="h-6 w-6 text-gray-900"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Botões de navegação customizados */}
            <div className="relative mt-8 flex justify-center gap-4">
              <button className="swiper-button-prev-custom flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg transition-all hover:bg-primary-600 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button className="swiper-button-next-custom flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg transition-all hover:bg-primary-600 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}

        {/* Vídeos em Destaque */}
        {videos.length > 0 && (
          <div>
            <h3 className="mb-8 text-center text-2xl font-bold text-gray-900">
              Vídeos de Depoimentos
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
                >
                  {videoPlaying === video.id ? (
                    <video
                      src={video.video}
                      controls
                      autoPlay
                      className="aspect-video w-full"
                    />
                  ) : (
                    <>
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={video.thumbnail}
                          alt={video.alt}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <button
                        onClick={() => playVideo(video.id)}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all duration-300 group-hover:bg-black/40"
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm shadow-xl transition-transform duration-300 group-hover:scale-110">
                          <Play className="h-8 w-8 text-primary-500 ml-1" />
                        </div>
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-lg text-gray-600">
            Quer fazer parte dessas histórias de sucesso?
          </p>
          <Button size="lg" asChild>
            <a href="#cursos">
              Conheça Nossos Cursos
            </a>
          </Button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Fechar"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <div className="relative max-h-[90vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt="Depoimento ampliado"
              width={1200}
              height={1600}
              className="h-auto w-auto max-h-[90vh] rounded-lg object-contain"
            />
          </div>
        </div>
      )}

      {/* Estilos customizados para o Swiper */}
      <style jsx global>{`
        .testimonials-swiper .swiper-pagination {
          bottom: 0 !important;
        }
        .testimonials-swiper .swiper-pagination-bullet {
          background: #22c55e;
          opacity: 0.3;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </section>
  )
}
