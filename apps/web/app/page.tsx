import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { HeroSection } from '@/components/home/HeroSection'
import { CategorySection } from '@/components/home/CategorySection'
import { AboutSection } from '@/components/home/AboutSection'
import { PopularCoursesSection } from '@/components/home/PopularCoursesSection'
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection'
import { CounterUpSection } from '@/components/home/CounterUpSection'
import { TeamSection } from '@/components/home/TeamSection'
import { NewsletterSection } from '@/components/sections/NewsletterSection'
import { TestimonialSection } from '@/components/sections/TestimonialSection'
import { SlidingTextSection } from '@/components/sections/SlidingTextSection'
import { BlogSection } from '@/components/home/BlogSection'
import { getPosts } from '@/lib/api/posts'
import { getFeaturedCursos } from '@/lib/payload'
import { formatDate } from '@/lib/utils'
import { BookOpen, Users, Award, TrendingUp, ArrowRight, Calendar, Clock } from 'lucide-react'
import { Curso } from '@/types/payload'

export default async function Home() {
  // Fetch latest posts and courses
  const postsResponse = await getPosts(9, 1)
  const cursosResponse = await getFeaturedCursos(3)

  const latestPosts = postsResponse.docs || []
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
      <TeamSection />

      {/* Newsletter Section */}
      <NewsletterSection
        title="Continue sua jornada com a Nutrindo Juntos"
        description="Receba conteúdos práticos, reflexões de carreira, novidades e convites especiais — no seu tempo, sem excesso e sem ruído."
      />

      {/* Testimonial Section - Depoimentos */}
      <TestimonialSection />

      {/* Sliding Text Section - Faixa Deslizante */}
      <SlidingTextSection />

      {/* Featured Courses Section */}
      {featuredCourses.length > 0 && (
        <section className="bg-gradient-to-b from-white to-lavender/20 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <h2 className="mb-4 font-display text-3xl font-bold text-graphite md:text-4xl">
                  Cursos em Destaque
                </h2>
                <p className="text-lg text-graphite/80">
                  Aprenda com os melhores profissionais da área
                </p>
              </div>
              <Button variant="outline" asChild className="hidden border-primary-500 text-primary-500 hover:bg-primary-50 md:flex">
                <Link href="/cursos">
                  Ver Todos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredCourses.map((curso: Curso) => (
                <Card key={curso.id} className="overflow-hidden transition-all hover:shadow-xl">
                  {curso.featuredImage && (
                    <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                      <Image
                        src={typeof curso.featuredImage === 'string' ? curso.featuredImage : curso.featuredImage.url}
                        alt={curso.title}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant="outline">{curso.level}</Badge>
                    </div>
                    <CardTitle className="line-clamp-2">{curso.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {curso.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-gray-600">
                      {curso.duration && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{curso.duration}</span>
                        </div>
                      )}
                      {curso.modules && (
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          <span>{curso.modules} módulos</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/cursos/${curso.slug}`}>Saiba Mais</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Button variant="outline" asChild>
                <Link href="/cursos">
                  Ver Todos os Cursos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Blog Section - Últimas do Blog */}
      {latestPosts.length > 0 && (
        <section id="blog">
          <BlogSection posts={latestPosts} />
        </section>
      )}
    </main>
  )
}
