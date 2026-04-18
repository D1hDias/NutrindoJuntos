import { HeroSection } from '@/components/home/HeroSection'
import { CategorySection } from '@/components/home/CategorySection'
import { AboutSection } from '@/components/home/AboutSection'
import { PopularCoursesSection } from '@/components/home/PopularCoursesSection'
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection'
import { CounterUpSection } from '@/components/home/CounterUpSection'
import { TeamSection } from '@/components/home/TeamSection'
import { NewsletterSection } from '@/components/sections/NewsletterSection'
// import { TestimonialSection } from '@/components/sections/TestimonialSection'
import { TestimonialsGallerySection } from '@/components/sections/TestimonialsGallerySection'
import { SlidingTextSection } from '@/components/sections/SlidingTextSection'
// import { BlogSection } from '@/components/home/BlogSection'
// import { getPosts } from '@/lib/api/posts'
import { getFeaturedCursos } from '@/lib/database'
// import { getGoogleReviews } from '@/lib/google-reviews'
import { getTestimonialImages, getTestimonialVideos } from '@/lib/testimonials'
import { Curso } from '@/types'

export default async function Home() {
  // Fetch courses and testimonials
  // const postsResponse = await getPosts(9, 1)
  const cursosResponse = await getFeaturedCursos(3)
  // const googleReviews = await getGoogleReviews()
  const testimonialImages = getTestimonialImages()
  const testimonialVideos = getTestimonialVideos()

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

      {/* Team Section - Nossa Equipe */}
      <section id="equipe">
        <TeamSection />
      </section>

      {/* Newsletter Section */}
      <NewsletterSection
        title="Continue sua jornada com a Nutrindo Juntos"
        description="Receba conteúdos práticos, reflexões de carreira, novidades e convites especiais — no seu tempo, sem excesso e sem ruído."
      />

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
