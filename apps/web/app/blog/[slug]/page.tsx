import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPostBySlug, getPosts, getRelatedPosts } from '@/lib/api/posts'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Button } from '@/components/ui/button'
import { PostCard } from '@/components/cards/PostCard'
import { SocialShare } from '@/components/blog/SocialShare'
import { ReadingTime } from '@/components/blog/ReadingTime'
import { ArticleSchema } from '@/components/seo/ArticleSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { RichTextRenderer } from '@/components/blog/RichTextRenderer'
import { calculateReadingTime } from '@/lib/reading-time'
import type { Post, Media, Categoria } from '@/types'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post não encontrado',
    }
  }

  const featuredImage = typeof post.featuredImage === 'object'
    ? (post.featuredImage as Media)
    : undefined

  const category = typeof post.categoria === 'object'
    ? (post.categoria as Categoria)
    : undefined

  const postUrl = `/blog/${post.slug}`
  const imageUrl = featuredImage?.url || '/og-image.jpg'

  return {
    title: post.title,
    description: post.excerpt,
    keywords: category?.name ? [category.name, 'nutrição', 'saúde'] : ['nutrição', 'saúde'],
    authors: [{ name: 'NUTRINDO JUNTOS' }],
    openGraph: {
      type: 'article',
      url: postUrl,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: ['NUTRINDO JUNTOS'],
      tags: category?.name ? [category.name] : undefined,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const featuredImage = typeof post.featuredImage === 'object'
    ? (post.featuredImage as Media)
    : undefined

  const category = typeof post.categoria === 'object'
    ? (post.categoria as Categoria)
    : undefined

  // Fetch related posts
  const relatedPosts = await getRelatedPosts(post.id, category?.slug, 3)

  // Calculate reading time
  // For now, we'll estimate from excerpt + title since content is rich text
  // In production, you'd extract text from rich text content
  const textForReading = `${post.title} ${post.excerpt} ${JSON.stringify(post.content || '')}`
  const readingTime = calculateReadingTime(textForReading)

  const breadcrumbItems = [
    { label: 'Início', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title },
  ]

  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`

  return (
    <>
      {/* SEO Schema.org markup */}
      <ArticleSchema
        title={post.title}
        description={post.excerpt || ''}
        publishedAt={post.publishedAt || ''}
        updatedAt={post.publishedAt || ''}
        authorName="NUTRINDO JUNTOS"
        imageUrl={featuredImage?.url}
        category={category?.name}
        url={postUrl}
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <main className="container mx-auto px-4 py-16">
        <Breadcrumbs items={breadcrumbItems} />

      <article className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {category && (
              <>
                <span className="rounded-full bg-primary-100 px-3 py-1 text-primary-700">
                  {category.name}
                </span>
                <span>•</span>
              </>
            )}
            <time dateTime={post.publishedAt || ''}>
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              }) : ''}
            </time>
            <span>•</span>
            <ReadingTime minutes={readingTime} />
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-muted-foreground">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Featured Image */}
        {featuredImage && (
          <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        )}

        {/* Content */}
        <RichTextRenderer
          content={post.content}
          className="mb-8"
        />

        {/* Social Share */}
        <div className="mt-12 flex justify-center border-y py-6">
          <SocialShare
            url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`}
            title={post.title}
            description={post.excerpt}
          />
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mx-auto mt-16 max-w-7xl">
          <div className="mb-8 border-t pt-8">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Artigos relacionados
            </h2>
            <p className="mt-2 text-muted-foreground">
              Continue aprendendo com estes artigos sobre {category?.name || 'nutrição'}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost: Post) => {
              const relatedFeaturedImage = typeof relatedPost.featuredImage === 'object'
                ? (relatedPost.featuredImage as Media)?.url
                : relatedPost.featuredImage
              const relatedCategory = typeof relatedPost.categoria === 'object'
                ? (relatedPost.categoria as Categoria)?.name
                : undefined

              return (
                <PostCard
                  key={relatedPost.id}
                  title={relatedPost.title}
                  excerpt={relatedPost.excerpt || ''}
                  slug={relatedPost.slug}
                  publishedAt={relatedPost.publishedAt || ''}
                  featuredImage={relatedFeaturedImage || ''}
                  category={relatedCategory || ''}
                />
              )
            })}
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <div className="mx-auto mt-12 max-w-4xl">
        <Button variant="outline" asChild>
          <Link href="/blog">← Voltar para o Blog</Link>
        </Button>
      </div>
    </main>
    </>
  )
}

// Generate static params for all posts
export async function generateStaticParams() {
  const { docs: posts } = await getPosts(100, 1)

  return posts.map((post: Post) => ({
    slug: post.slug,
  }))
}
