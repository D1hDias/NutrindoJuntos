/**
 * SUPABASE DATABASE TYPES
 * Types gerados automaticamente do schema PostgreSQL
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categorias: {
        Row: {
          id: string
          nome: string
          slug: string
          descricao: string | null
          ordem: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nome: string
          slug: string
          descricao?: string | null
          ordem?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nome?: string
          slug?: string
          descricao?: string | null
          ordem?: number
          created_at?: string
          updated_at?: string
        }
      }
      cursos: {
        Row: {
          id: string
          titulo: string
          slug: string
          descricao_breve: string
          descricao_completa: string
          preco: number
          preco_promocional: number | null
          carga_horaria: number
          nivel: 'iniciante' | 'intermediario' | 'avancado'
          status: 'draft' | 'published' | 'archived'
          categoria_id: string | null
          instrutor_id: string | null
          imagem_capa: string | null
          video_preview: string | null
          publico_alvo: string | null
          pre_requisitos: string | null
          objetivos: Json | null
          conteudo_programatico: Json | null
          sales_count: number
          rating_avg: number
          rating_count: number
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          titulo: string
          slug: string
          descricao_breve: string
          descricao_completa: string
          preco: number
          preco_promocional?: number | null
          carga_horaria: number
          nivel?: 'iniciante' | 'intermediario' | 'avancado'
          status?: 'draft' | 'published' | 'archived'
          categoria_id?: string | null
          instrutor_id?: string | null
          imagem_capa?: string | null
          video_preview?: string | null
          publico_alvo?: string | null
          pre_requisitos?: string | null
          objetivos?: Json | null
          conteudo_programatico?: Json | null
          sales_count?: number
          rating_avg?: number
          rating_count?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          titulo?: string
          slug?: string
          descricao_breve?: string
          descricao_completa?: string
          preco?: number
          preco_promocional?: number | null
          carga_horaria?: number
          nivel?: 'iniciante' | 'intermediario' | 'avancado'
          status?: 'draft' | 'published' | 'archived'
          categoria_id?: string | null
          instrutor_id?: string | null
          imagem_capa?: string | null
          video_preview?: string | null
          publico_alvo?: string | null
          pre_requisitos?: string | null
          objetivos?: Json | null
          conteudo_programatico?: Json | null
          sales_count?: number
          rating_avg?: number
          rating_count?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
      }
      posts: {
        Row: {
          id: string
          titulo: string
          slug: string
          excerpt: string
          conteudo: Json
          imagem_destaque: string | null
          categoria_id: string | null
          autor_id: string | null
          status: 'draft' | 'published' | 'archived'
          featured: boolean
          views: number
          reading_time: number
          tags: string[] | null
          meta_title: string | null
          meta_description: string | null
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          titulo: string
          slug: string
          excerpt: string
          conteudo: Json
          imagem_destaque?: string | null
          categoria_id?: string | null
          autor_id?: string | null
          status?: 'draft' | 'published' | 'archived'
          featured?: boolean
          views?: number
          reading_time?: number
          tags?: string[] | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          titulo?: string
          slug?: string
          excerpt?: string
          conteudo?: Json
          imagem_destaque?: string | null
          categoria_id?: string | null
          autor_id?: string | null
          status?: 'draft' | 'published' | 'archived'
          featured?: boolean
          views?: number
          reading_time?: number
          tags?: string[] | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
      }
      equipe: {
        Row: {
          id: string
          nome: string
          cargo: string
          bio: string
          avatar: string | null
          especialidades: string[] | null
          redes_sociais: Json | null
          ordem: number
          ativo: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nome: string
          cargo: string
          bio: string
          avatar?: string | null
          especialidades?: string[] | null
          redes_sociais?: Json | null
          ordem?: number
          ativo?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nome?: string
          cargo?: string
          bio?: string
          avatar?: string | null
          especialidades?: string[] | null
          redes_sociais?: Json | null
          ordem?: number
          ativo?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      curso_nivel: 'iniciante' | 'intermediario' | 'avancado'
      content_status: 'draft' | 'published' | 'archived'
    }
  }
}
