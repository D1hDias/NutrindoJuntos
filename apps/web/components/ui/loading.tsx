import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * Loading Components
 * Standardized loading states for consistent UX
 */

// ============================================
// Spinner Loader
// ============================================

interface SpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Spinner({ className, size = 'md' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  }

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-primary border-t-transparent',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Carregando...</span>
    </div>
  )
}

// ============================================
// Full Page Loader
// ============================================

export function PageLoader() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    </div>
  )
}

// ============================================
// Button Loader (inline with text)
// ============================================

export function ButtonLoader() {
  return (
    <Spinner size="sm" className="mr-2" />
  )
}

// ============================================
// Card Skeleton Loader
// ============================================

export function CardSkeleton() {
  return (
    <div className="space-y-4 rounded-lg border p-6">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  )
}

// ============================================
// Post Card Skeleton
// ============================================

export function PostCardSkeleton() {
  return (
    <article className="group relative overflow-hidden rounded-lg border transition-all hover:shadow-lg">
      <Skeleton className="aspect-[16/9] w-full" />
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex items-center justify-between pt-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </article>
  )
}

// ============================================
// Course Card Skeleton
// ============================================

export function CourseCardSkeleton() {
  return (
    <div className="group overflow-hidden rounded-lg border transition-all hover:shadow-lg">
      <Skeleton className="aspect-video w-full" />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

// ============================================
// Grid Skeleton (for blog/courses listing)
// ============================================

interface GridSkeletonProps {
  count?: number
  type?: 'post' | 'course' | 'card'
}

export function GridSkeleton({ count = 6, type = 'card' }: GridSkeletonProps) {
  const SkeletonComponent = {
    post: PostCardSkeleton,
    course: CourseCardSkeleton,
    card: CardSkeleton,
  }[type]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  )
}

// ============================================
// Text Skeleton (for content loading)
// ============================================

interface TextSkeletonProps {
  lines?: number
  className?: string
}

export function TextSkeleton({ lines = 3, className }: TextSkeletonProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === lines - 1 ? 'w-4/5' : 'w-full'
          )}
        />
      ))}
    </div>
  )
}
