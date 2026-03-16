import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface CourseCardProps {
  title: string
  description: string
  slug: string
  thumbnail?: string
  level?: 'Iniciante' | 'Intermediário' | 'Avançado'
  duration?: string
  price?: number
  isComingSoon?: boolean
}

export function CourseCard({
  title,
  description,
  slug,
  thumbnail,
  level = 'Iniciante',
  duration,
  price,
  isComingSoon = false,
}: CourseCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      {thumbnail && (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          {isComingSoon && (
            <div className="absolute right-2 top-2 rounded-full bg-yellow-500 px-3 py-1 text-xs font-semibold text-white">
              Em breve
            </div>
          )}
        </div>
      )}

      <CardHeader>
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-primary-100 px-2 py-1 text-primary-700">
            {level}
          </span>
          {duration && (
            <>
              <span>•</span>
              <span>{duration}</span>
            </>
          )}
        </div>

        <CardTitle className="line-clamp-2 text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-3">{description}</CardDescription>
      </CardHeader>

      <CardFooter className="mt-auto flex items-center justify-between">
        {price !== undefined && (
          <div className="text-2xl font-bold text-primary-600">
            {price === 0 ? 'Gratuito' : `R$ ${price.toFixed(2)}`}
          </div>
        )}
        <Button asChild className="ml-auto">
          <Link href={`/cursos/${slug}`}>
            {isComingSoon ? 'Saiba mais' : 'Ver curso'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
