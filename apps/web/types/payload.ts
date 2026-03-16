export interface Media {
  id: string
  alt: string
  caption?: string
  url: string
  filename: string
  mimeType: string
  filesize: number
  width?: number
  height?: number
  createdAt: string
  updatedAt: string
}

export interface Author {
  name: string
  role: string
  avatar: string
}

// Slate rich text node type (Payload CMS 2.0)
export interface SlateNode {
  type?: string
  text?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  children?: SlateNode[]
  url?: string
  value?: any
  fields?: any
  [key: string]: any
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: SlateNode[] | any // Rich text content (Slate format)
  featuredImage?: Media | string
  categoria?: Categoria | string
  tags?: (Tag | string)[]
  author?: User | string | Author // Support both User from CMS and mock Author
  publishedAt: string
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

export interface Categoria {
  id: string
  name: string
  slug: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  createdAt: string
  updatedAt: string
}

export interface Curso {
  id: string
  title: string
  slug: string
  description: string
  headline?: string
  content: SlateNode[] | any // Rich text content (Slate format)
  featuredImage?: Media | string
  category: 'clinica' | 'esportiva' | 'funcional' | 'gestao' | 'marketing'
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  modules?: number
  rating?: number
  reviews?: number
  price: number
  startDate?: string
  practicalFocus?: boolean
  targetAudience?: string
  paymentLink?: string
  isLive?: boolean
  instructor?: TeamMember | string
  status: 'draft' | 'coming_soon' | 'published' | 'sold_out'
  createdAt: string
  updatedAt: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio?: string
  photo?: Media | string
  credentials?: string
  socialLinks?: {
    instagram?: string
    linkedin?: string
    website?: string
  }
  order: number
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  name?: string
  role?: string
  createdAt: string
  updatedAt: string
}

export interface SiteSettings {
  id: string
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone?: string
  logo?: Media | string
  favicon?: Media | string
  updatedAt: string
}

export interface SocialLinks {
  id: string
  instagram?: string
  facebook?: string
  linkedin?: string
  youtube?: string
  twitter?: string
  updatedAt: string
}
