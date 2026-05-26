// Types principais do projeto NutrindoJuntos
// Baseados no schema Supabase

export interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: any // Rich text content
  featuredImage?: string
  publishedAt?: string
  status?: 'draft' | 'published'
  author?: Author
  category?: {
    id: string
    name: string
    slug: string
  }
  categoria?: {  // Alias for category (backwards compatibility)
    id: string
    name: string
    slug: string
  }
  tags?: Array<{
    id: string
    name: string
  }>
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: string
  }
}

export interface Curso {
  id: string
  title: string
  slug: string
  description?: string
  content?: any
  price: number
  originalPrice?: number
  featuredImage?: string
  category?: {
    id: string
    name: string
    slug: string
  }
  instructor?: Author
  duration?: string
  level?: 'iniciante' | 'intermediario' | 'avancado'
  enrolledCount?: number
  rating?: number
  reviewCount?: number
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
  status?: 'draft' | 'published' | 'coming_soon'
  headline?: string
  targetAudience?: string[]
  practicalFocus?: string
  whatYouWillLearn?: string[]
  requirements?: string[]
  modules?: any[]
  salesCount?: number
  createdAt?: string
  paymentLink?: string
  installments?: number
  isLive?: boolean
}

export interface Categoria {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  createdAt?: string
  updatedAt?: string
}

export type TeamMember = Membro

export interface Membro {
  id: string
  name: string
  role: string
  bio?: string
  avatar?: string
  instagram?: string
  linkedin?: string
}

export interface Newsletter {
  id: string
  email: string
  name?: string
  subscribedAt: string
}

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  message?: string
  source: 'curso' | 'mentoria' | 'contato'
  createdAt: string
}

// Tipos auxiliares
export interface Media {
  id: string
  url: string
  alt?: string
  width?: number
  height?: number
}

export interface Author {
  id: string
  name: string
  avatar?: string | Media
  bio?: string
  role?: string
}
