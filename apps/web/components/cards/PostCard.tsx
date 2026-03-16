import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface PostCardProps {
  title: string
  excerpt: string
  slug: string
  publishedAt: string
  featuredImage?: string
  category?: string
  readingTime?: string
}

export function PostCard({
  title,
  excerpt,
  slug,
  publishedAt,
  featuredImage,
  category,
  readingTime = '5 min',
}: PostCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      {featuredImage && (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      )}

      <CardHeader>
        <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
          {category && (
            <>
              <span className="rounded-full bg-primary-100 px-2 py-1 text-primary-700">
                {category}
              </span>
              <span>•</span>
            </>
          )}
          <time dateTime={publishedAt}>
            {new Date(publishedAt).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </time>
          <span>•</span>
          <span>{readingTime} de leitura</span>
        </div>

        <CardTitle className="line-clamp-2 text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-3">{excerpt}</CardDescription>
      </CardHeader>

      <CardFooter className="mt-auto">
        <Button variant="ghost" asChild className="w-full">
          <Link href={`/blog/${slug}`}>
            Ler artigo →
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
