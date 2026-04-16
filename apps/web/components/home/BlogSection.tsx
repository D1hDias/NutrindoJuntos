'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Calendar, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import type { Post, Author } from '@/types/payload'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface BlogSectionProps {
  posts: Post[]
}

export function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-lavender/20">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="section-title text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-3 w-3 rounded-full bg-primary-500" />
            <span className="font-serif text-lg font-semibold text-graphite">
              Nosso Blog
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold text-graphite lg:text-5xl">
            Últimas do{' '}
            <span className="text-primary-500">Blog</span>
          </h2>
        </div>

        {/* Swiper Carousel */}
        <div className="relative blog-carousel-wrapper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            navigation={false}
            pagination={{
              el: '.blog-pagination-wrapper',
              clickable: true,
              dynamicBullets: false
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            loop={true}
            className="blog-swiper"
          >
            {posts.map((post) => {
              // Type guard para verificar se author é do tipo Author (mock data)
              const hasAuthorData = post.author && typeof post.author === 'object' && 'avatar' in post.author
              const author = hasAuthorData ? (post.author as Author) : null

              return (
                <SwiperSlide key={post.id}>
                  <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-500 border-lavender">
                    {/* Imagem */}
                    {post.featuredImage && (
                      <div className="relative aspect-video w-full overflow-hidden group">
                        <Image
                          src={
                            typeof post.featuredImage === 'string'
                              ? post.featuredImage
                              : post.featuredImage.url
                          }
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        {/* Overlay hover */}
                        <div className="absolute inset-0 bg-graphite/0 group-hover:bg-graphite/50 transition-all duration-500" />
                      </div>
                    )}

                    <CardContent className="p-6">
                      {/* Meta */}
                      <div className="flex items-center gap-4 mb-3 text-sm text-neutral-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                        </div>
                        {post.categoria && typeof post.categoria === 'object' && (
                          <Badge variant="secondary">{post.categoria.name}</Badge>
                        )}
                      </div>

                      {/* Título */}
                      <h3 className="text-xl font-bold mb-2 line-clamp-2 transition-colors hover:text-primary-500">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-base text-neutral-600 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Botão + Autor */}
                      <div className="flex items-center justify-between pt-4 border-t border-lavender">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/blog/${post.slug}`}>
                            Ler mais
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>

                        {/* Autor (mock data) */}
                        {author && (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={author.avatar} alt={author.name} />
                              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm hidden sm:block">
                              <p className="font-semibold text-graphite leading-tight">{author.name}</p>
                              <p className="text-xs text-neutral-600">{author.role}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>

        {/* Pagination + Ver Todos Button */}
        <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
          {/* Pagination Dots */}
          <div className="blog-pagination-wrapper flex justify-center items-center"></div>

          {/* Ver Todos Link */}
          <Button variant="outline" size="lg" asChild>
            <Link href="/blog">
              Ver Todos os Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
