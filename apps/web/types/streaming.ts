/**
 * TIPOS TYPESCRIPT - PLATAFORMA DE STREAMING
 * Fase 3 - Planejado para implementação futura
 * NÃO ATIVAR AINDA - Apenas estrutura preparada
 */

// ==============================================
// LESSON TYPES
// ==============================================

export type LessonStatus = 'draft' | 'published' | 'scheduled'

export type VideoProvider = 'mux' | 'cloudflare' | 'vimeo' | 'youtube'

export type MaterialType = 'pdf' | 'slides' | 'exercise' | 'link' | 'code'

export interface LessonMaterial {
  titulo: string
  tipo: MaterialType
  arquivo?: {
    url: string
    filename: string
    filesize: number
  }
  url?: string
}

export interface Lesson {
  id: string
  titulo: string
  slug: string
  curso: string | Curso // Relationship
  modulo: string
  ordem: number
  descricao?: string
  video: {
    provider: VideoProvider
    videoId: string
    playbackId?: string // Mux
    duracao: number // em segundos
    thumbnail?: {
      url: string
    }
  }
  materiais?: LessonMaterial[]
  status: LessonStatus
  liberacao?: Date
  preview: boolean // Aula preview gratuita
  createdAt: Date
  updatedAt: Date
}

// ==============================================
// PROGRESS TYPES
// ==============================================

export interface Progress {
  id: string
  user: string | User // Relationship
  lesson: string | Lesson // Relationship
  percentComplete: number // 0-100
  completed: boolean
  lastWatchedAt?: Date
  timeWatched: number // em segundos
  currentTimestamp: number // posição atual do vídeo
  createdAt: Date
  updatedAt: Date
}

export interface CourseProgress {
  cursoId: string
  totalLessons: number
  completedLessons: number
  percentComplete: number
  totalDuration: number // segundos
  watchedDuration: number // segundos
  lastAccessedAt?: Date
  estimatedTimeRemaining: number // segundos
}

// ==============================================
// COMMENT TYPES
// ==============================================

export interface Comment {
  id: string
  user: string | User // Relationship
  lesson: string | Lesson // Relationship
  content: string
  timestamp?: number // momento do vídeo (segundos)
  parentComment?: string | Comment // Relationship (para respostas)
  approved: boolean
  likes: number
  createdAt: Date
  updatedAt: Date
}

export interface CommentWithReplies extends Comment {
  replies: Comment[]
  userLiked: boolean
}

// ==============================================
// CERTIFICATE TYPES
// ==============================================

export interface Certificate {
  id: string
  certificateNumber: string // CERT-20251116-001
  user: string | User // Relationship
  curso: string | Curso // Relationship
  issuedAt: Date
  completionData: {
    totalLessons: number
    completedLessons: number
    totalHours: number
    finalGrade?: number
  }
  pdfUrl?: string
  validated: boolean
  createdAt: Date
}

// ==============================================
// USER TYPES (Extended for streaming)
// ==============================================

export type UserRole = 'aluno' | 'instrutor' | 'admin'

export type UserPlan = 'free' | 'course' | 'monthly' | 'yearly'

export interface User {
  id: string
  nome: string
  email: string
  role: UserRole
  plano: UserPlan
  avatar?: {
    url: string
  }
  bio?: string
  cursosComprados?: string[] | Curso[]
  preferences: {
    emailNotifications: boolean
    pushNotifications: boolean
    autoPlayNextLesson: boolean
    defaultVideoQuality: 'auto' | '1080' | '720' | '480'
  }
  createdAt: Date
}

export interface UserStats {
  cursosEmAndamento: number
  cursosConcluidos: number
  horasAssistidas: number
  certificados: number
  streak: number // dias consecutivos estudando
  totalAulasAssistidas: number
}

// ==============================================
// CURSO TYPES (Extended for streaming)
// ==============================================

export interface CursoModule {
  nome: string
  ordem: number
  aulas: Lesson[]
}

export interface Curso {
  id: string
  titulo: string
  slug: string
  descricaoBreve: string
  descricao: string
  preco: number
  cargaHoraria: number
  modulos?: CursoModule[]
  totalAulas?: number
  imagemCapa?: {
    url: string
  }
  instrutor?: {
    nome: string
    avatar?: {
      url: string
    }
    bio?: string
  }
  publicoAlvo?: string
  preRequisitos?: string
  objetivos?: string[]
  createdAt: Date
  updatedAt: Date
}

// ==============================================
// VIDEO PLAYER TYPES
// ==============================================

export interface VideoPlayerProps {
  playbackId: string
  title: string
  onProgress?: (time: number, percent: number) => void
  onComplete?: () => void
  onPlay?: () => void
  onPause?: () => void
  startTime?: number
  autoPlay?: boolean
}

export interface VideoPlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  buffered: number
  volume: number
  muted: boolean
  playbackRate: number
  quality: 'auto' | '1080p' | '720p' | '480p' | '360p'
  fullscreen: boolean
  pictureInPicture: boolean
}

export interface VideoQuality {
  label: string
  value: string
  bitrate: number
  width: number
  height: number
}

// ==============================================
// MUX TYPES
// ==============================================

export interface MuxAsset {
  id: string
  playback_ids: Array<{
    id: string
    policy: 'public' | 'signed'
  }>
  duration: number
  max_stored_resolution: string
  max_stored_frame_rate: number
  status: 'preparing' | 'ready' | 'errored'
  tracks: Array<{
    type: 'video' | 'audio'
    max_width?: number
    max_height?: number
    max_frame_rate?: number
    duration: number
  }>
  created_at: string
}

export interface MuxUploadURL {
  id: string
  url: string
  timeout: number
  status: 'waiting' | 'asset_created' | 'errored' | 'cancelled' | 'timed_out'
  new_asset_settings: {
    playback_policy: 'public' | 'signed'
  }
}

// ==============================================
// DASHBOARD TYPES
// ==============================================

export interface DashboardData {
  user: User
  stats: UserStats
  cursosEmAndamento: Array<{
    curso: Curso
    progress: CourseProgress
    lastLesson?: Lesson
  }>
  continueWatching: Array<{
    lesson: Lesson
    curso: Curso
    progress: Progress
  }>
  recentCertificates: Certificate[]
  achievements: Achievement[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: Date
  progress?: number // 0-100
}

// ==============================================
// NOTIFICATION TYPES
// ==============================================

export type NotificationType =
  | 'course_completed'
  | 'certificate_issued'
  | 'new_lesson'
  | 'comment_reply'
  | 'achievement_unlocked'

export interface Notification {
  id: string
  user: string | User
  type: NotificationType
  title: string
  message: string
  data?: Record<string, any>
  read: boolean
  createdAt: Date
}

// ==============================================
// API RESPONSE TYPES
// ==============================================

export interface StreamingAPIResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
  meta?: {
    total?: number
    page?: number
    limit?: number
  }
}

// ==============================================
// REALTIME TYPES (Supabase)
// ==============================================

export interface RealtimeProgressUpdate {
  userId: string
  lessonId: string
  percentComplete: number
  currentTimestamp: number
}

export interface RealtimeCommentEvent {
  type: 'INSERT' | 'UPDATE' | 'DELETE'
  comment: Comment
}

// ==============================================
// ANALYTICS TYPES
// ==============================================

export interface VideoAnalytics {
  lessonId: string
  totalViews: number
  uniqueViewers: number
  avgWatchTime: number // segundos
  completionRate: number // percentual
  avgEngagement: number // percentual
  dropOffPoints: Array<{
    timestamp: number
    dropOffRate: number
  }>
}

export interface CourseAnalytics {
  cursoId: string
  totalEnrollments: number
  activeStudents: number
  completionRate: number
  avgRating: number
  avgCompletionTime: number // dias
  mostWatchedLessons: Array<{
    lesson: Lesson
    views: number
  }>
}
