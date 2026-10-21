import { HeroSection } from '@/components/home/HeroSection'
import { CategorySection } from '@/components/home/CategorySection'
import { AboutSection } from '@/components/home/AboutSection'
import { PopularCoursesSection } from '@/components/home/PopularCoursesSection'
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection'
import { CounterUpSection } from '@/components/home/CounterUpSection'
import { TeamSection } from '@/components/home/TeamSection'
import { PartnersSection } from '@/components/home/PartnersSection'
import { NewsletterSection } from '@/components/sections/NewsletterSection'
// import { TestimonialSection } from '@/components/sections/TestimonialSection'
import { TestimonialsGallerySection } from '@/components/sections/TestimonialsGallerySection'
import { SlidingTextSection } from '@/components/sections/SlidingTextSection'
// import { BlogSection } from '@/components/home/BlogSection'
// import { getPosts } from '@/lib/api/posts'
import { getFeaturedCursos } from '@/lib/database'
// import { getGoogleReviews } from '@/lib/google-reviews'
import { getTestimonialImages, getTestimonialVideos } from '@/lib/testimonials'
import { getGaleria } from '@/lib/galeria'
import { GaleriaMural } from '@/components/galeria/GaleriaMural'
import { Curso } from '@/types'

export default async function Home() {
  // Fetch courses and testimonials
  // const postsResponse = await getPosts(9, 1)
  const cursosResponse = await getFeaturedCursos(3)
  // const googleReviews = await getGoogleReviews()
  const testimonialImages = getTestimonialImages()
  const testimonialVideos = getTestimonialVideos()
  const galeria = getGaleria()

  // const latestPosts = postsResponse.docs || []
  const featuredCourses = (cursosResponse.docs || []) as Curso[]

  return (
    <main>
      {/* Hero Section - New Figma-inspired design */}
      <HeroSection />

      {/* Category Section - Browse Categories */}
      <CategorySection />

      {/* About Section - Nossa História */}
      <section id="sobre-nos">
        <AboutSection />
      </section>

      {/* Popular Courses Section - Cursos Populares */}
      <section id="cursos">
        <PopularCoursesSection courses={featuredCourses} />
      </section>

      {/* Why Choose Us Section - Por Que Nos Escolher */}
      <WhyChooseUsSection />

      {/* Counter Up Section - Contadores Animados */}
      <CounterUpSection />

      {/* Galeria - a prova visual logo abaixo dos números */}
      <section id="galeria" className="scroll-mt-20 bg-[#f6f2fa] py-24 lg:py-[120px]">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary-500" />
              <span className="font-serif text-lg font-semibold text-primary-500">Galeria</span>
            </div>
            <h2 className="font-display text-4xl font-bold leading-tight text-graphite lg:text-5xl">
              Por trás dos{' '}
              <span className="relative inline-block">
                números
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 10" fill="none" aria-hidden="true">
                  <path d="M0 5 L200 5" stroke="currentColor" strokeWidth="3" opacity="0.3" className="text-primary-500" />
                </svg>
              </span>
            </h2>
            <p className="mt-6 text-lg text-neutral-500">
              Os números acima têm rosto: alunos em sala, palestras e os congressos de que participamos.
            </p>
          </div>
          <GaleriaMural
            items={galeria}
            limite={8}
            limiteCelular={6}
            cta={{ href: '/sobre#galeria', label: 'Ver todas as fotos' }}
          />
        </div>
      </section>

      {/* Team Section - Nossa Equipe */}
      <section id="equipe">
        <TeamSection />
      </section>

      {/* Parceiros - faixa rolante logo abaixo da Equipe */}
      <PartnersSection />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Sliding Text Section - Faixa Deslizante */}
      <SlidingTextSection />

      {/* Testimonials Gallery - Depoimentos Reais (WhatsApp/Instagram) */}
      <TestimonialsGallerySection images={testimonialImages} videos={testimonialVideos} />

      {/* Testimonial Section - Depoimentos (Google Meu Negócio) - STAND-BY */}
      {/* <TestimonialSection reviews={googleReviews} /> */}

      {/* Blog Section - Últimas do Blog */}
      {/* Temporariamente oculto - sem blog por enquanto */}
      {/* {latestPosts.length > 0 && (
        <section id="blog">
          <BlogSection posts={latestPosts} />
        </section>
      )} */}
    </main>
  )
}
