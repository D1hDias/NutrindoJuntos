# 🎬 Plataforma de Streaming - O "Netflix" da NUTRINDO JUNTOS

**Versão:** 1.0
**Data:** 16/11/2025
**Status:** 🔵 Planejado (Fase 3)

---

## 📋 Visão Geral

Transformar a NUTRINDO JUNTOS em uma **plataforma completa de educação continuada em nutrição**, onde alunos podem:

- 🎓 Assistir aulas em vídeo (on-demand)
- 📚 Acessar materiais complementares
- 💬 Comentar e interagir com instrutores
- 📊 Acompanhar progresso de estudos
- 🏆 Conquistar certificados
- 👥 Participar de comunidade exclusiva

---

## 🎯 Objetivos

### Transformação do Negócio

| De (Fase 1-2) | Para (Fase 3) |
|---------------|---------------|
| Site institucional | Plataforma educacional |
| Cursos presenciais/ao vivo | Cursos on-demand 24/7 |
| Contato manual | Acesso automático |
| Conteúdo estático | Experiência interativa |
| Venda pontual | Assinaturas recorrentes |

### Metas (12 meses após lançamento)

| Métrica | Meta Mínima | Meta Aspiracional |
|---------|-------------|-------------------|
| Alunos ativos | 500 | 1.500 |
| Taxa de conclusão | 40% | 60% |
| NPS (Net Promoter Score) | 50 | 70 |
| Receita recorrente (MRR) | R$ 25.000 | R$ 75.000 |
| Horas assistidas/mês | 2.000h | 5.000h |
| Taxa de renovação | 70% | 85% |

---

## 🏗️ Arquitetura da Plataforma

### Stack Tecnológico Recomendado

```yaml
frontend:
  framework: Next.js 15+ (App Router)
  auth: NextAuth.js v5
  video_player: Video.js ou Plyr
  state: Zustand (gerenciamento de estado)
  ui: shadcn/ui + Tailwind CSS

backend:
  cms: Payload CMS (já configurado)
  database: PostgreSQL (Supabase)
  auth: NextAuth + JWT
  api: REST (Payload) + tRPC (operações em tempo real)

video_hosting:
  primary: Mux (recomendado)
  alternative: Cloudflare Stream ou Vimeo Pro
  reasons:
    - Encoding automático
    - Múltiplas resoluções
    - DRM protection
    - Analytics integrado
    - Thumbnails automáticos

storage:
  videos: Mux/Cloudflare Stream
  materials: Cloudflare R2 ou AWS S3
  images: Cloudinary

real_time:
  comments: Supabase Realtime
  progress: WebSocket ou polling
  notifications: Server-Sent Events (SSE)

analytics:
  user: Mixpanel ou Amplitude
  video: Mux Data ou native player
  business: Google Analytics 4
```

---

## 🎨 Estrutura de Páginas

### Área do Aluno

```
/aluno
├── /dashboard                 # Dashboard principal
│   ├── Cursos em andamento
│   ├── Próximas aulas
│   ├── Progresso geral
│   └── Recomendações
│
├── /cursos                    # Biblioteca de cursos
│   ├── /em-andamento
│   ├── /concluidos
│   └── /[slug]                # Página do curso
│       ├── Visão geral
│       ├── Aulas (accordion)
│       ├── Materiais
│       ├── Progresso
│       └── Comunidade
│
├── /aula/[id]                 # Player de vídeo
│   ├── Video player
│   ├── Controles (play, speed, quality)
│   ├── Navegação de aulas
│   ├── Materiais da aula
│   ├── Comentários
│   └── Próxima aula (auto-play)
│
├── /progresso                 # Acompanhamento
│   ├── Cursos iniciados
│   ├── Horas assistidas
│   ├── Certificados conquistados
│   └── Streak de estudos
│
├── /certificados              # Certificados
│   ├── Lista de certificados
│   ├── Download PDF
│   └── Compartilhar nas redes
│
├── /comunidade                # Comunidade
│   ├── Feed de discussões
│   ├── Perguntas e respostas
│   ├── Eventos ao vivo
│   └── Networking
│
└── /perfil                    # Perfil do aluno
    ├── Dados pessoais
    ├── Configurações
    ├── Plano e pagamento
    └── Notificações
```

---

## 📊 Collections do Payload CMS

### 1. Collection: Users (Atualizada)

```typescript
// apps/cms/src/collections/Users.ts (atualizado)

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // Habilitar autenticação
  admin: {
    useAsTitle: 'nome',
    defaultColumns: ['nome', 'email', 'role', 'plano', 'createdAt'],
  },
  fields: [
    {
      name: 'nome',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'aluno',
      options: [
        { label: 'Aluno', value: 'aluno' },
        { label: 'Instrutor', value: 'instrutor' },
        { label: 'Admin', value: 'admin' },
      ],
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bio',
      type: 'textarea',
      maxLength: 500,
    },
    {
      name: 'plano',
      type: 'select',
      defaultValue: 'free',
      options: [
        { label: 'Gratuito', value: 'free' },
        { label: 'Curso Avulso', value: 'course' },
        { label: 'Assinatura Mensal', value: 'monthly' },
        { label: 'Assinatura Anual', value: 'yearly' },
      ],
    },
    {
      name: 'cursosComprados',
      type: 'relationship',
      relationTo: 'cursos',
      hasMany: true,
      label: 'Cursos Comprados',
    },
    {
      name: 'preferences',
      type: 'group',
      label: 'Preferências',
      fields: [
        {
          name: 'emailNotifications',
          type: 'checkbox',
          defaultValue: true,
          label: 'Receber notificações por email',
        },
        {
          name: 'pushNotifications',
          type: 'checkbox',
          defaultValue: true,
          label: 'Receber notificações push',
        },
        {
          name: 'autoPlayNextLesson',
          type: 'checkbox',
          defaultValue: true,
          label: 'Auto-play próxima aula',
        },
        {
          name: 'defaultVideoQuality',
          type: 'select',
          defaultValue: 'auto',
          options: [
            { label: 'Auto', value: 'auto' },
            { label: '1080p', value: '1080' },
            { label: '720p', value: '720' },
            { label: '480p', value: '480' },
          ],
        },
      ],
    },
  ],
}
```

---

### 2. Collection: Lessons (Aulas)

```typescript
// apps/cms/src/collections/Lessons.ts

export const Lessons: CollectionConfig = {
  slug: 'lessons',
  labels: {
    singular: 'Aula',
    plural: 'Aulas',
  },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'curso', 'modulo', 'ordem', 'duracao', 'status'],
    group: 'Conteúdo',
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      required: true,
      label: 'Título da Aula',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL amigável (gerado automaticamente)',
      },
    },
    {
      name: 'curso',
      type: 'relationship',
      relationTo: 'cursos',
      required: true,
      label: 'Curso',
    },
    {
      name: 'modulo',
      type: 'text',
      required: true,
      label: 'Módulo',
      admin: {
        description: 'Ex: Módulo 1, Módulo 2, etc.',
      },
    },
    {
      name: 'ordem',
      type: 'number',
      required: true,
      label: 'Ordem',
      admin: {
        description: 'Ordem da aula dentro do módulo',
      },
    },
    {
      name: 'descricao',
      type: 'richText',
      label: 'Descrição',
      admin: {
        description: 'Descrição detalhada da aula',
      },
    },
    {
      name: 'video',
      type: 'group',
      label: 'Vídeo',
      fields: [
        {
          name: 'provider',
          type: 'select',
          required: true,
          defaultValue: 'mux',
          options: [
            { label: 'Mux', value: 'mux' },
            { label: 'Cloudflare Stream', value: 'cloudflare' },
            { label: 'Vimeo', value: 'vimeo' },
            { label: 'YouTube (Privado)', value: 'youtube' },
          ],
        },
        {
          name: 'videoId',
          type: 'text',
          required: true,
          label: 'Video ID',
          admin: {
            description: 'ID do vídeo no provider escolhido',
          },
        },
        {
          name: 'playbackId',
          type: 'text',
          label: 'Playback ID (Mux)',
          admin: {
            condition: (data) => data.video?.provider === 'mux',
          },
        },
        {
          name: 'duracao',
          type: 'number',
          label: 'Duração (segundos)',
          required: true,
        },
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
          label: 'Thumbnail',
          admin: {
            description: 'Thumbnail personalizado (opcional)',
          },
        },
      ],
    },
    {
      name: 'materiais',
      type: 'array',
      label: 'Materiais Complementares',
      fields: [
        {
          name: 'titulo',
          type: 'text',
          required: true,
        },
        {
          name: 'tipo',
          type: 'select',
          required: true,
          options: [
            { label: 'PDF', value: 'pdf' },
            { label: 'Slides', value: 'slides' },
            { label: 'Exercício', value: 'exercise' },
            { label: 'Link Externo', value: 'link' },
            { label: 'Código', value: 'code' },
          ],
        },
        {
          name: 'arquivo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data, siblingData) =>
              siblingData.tipo !== 'link',
          },
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            condition: (data, siblingData) =>
              siblingData.tipo === 'link',
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Rascunho', value: 'draft' },
        { label: 'Publicado', value: 'published' },
        { label: 'Agendado', value: 'scheduled' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'liberacao',
      type: 'date',
      label: 'Data de Liberação',
      admin: {
        position: 'sidebar',
        description: 'Quando a aula ficará disponível (opcional)',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'preview',
      type: 'checkbox',
      defaultValue: false,
      label: 'Aula Preview',
      admin: {
        position: 'sidebar',
        description: 'Permitir visualização sem compra do curso',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        // Gerar slug automaticamente
        if (operation === 'create' && !data.slug) {
          data.slug = slugify(data.titulo, { lower: true, strict: true })
        }
        return data
      },
    ],
  },
}
```

---

### 3. Collection: Progress (Progresso)

```typescript
// apps/cms/src/collections/Progress.ts

export const Progress: CollectionConfig = {
  slug: 'progress',
  labels: {
    singular: 'Progresso',
    plural: 'Progresso',
  },
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['user', 'lesson', 'percentComplete', 'completed', 'updatedAt'],
    group: 'Alunos',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return { user: { equals: user?.id } }
    },
    create: true,
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return { user: { equals: user?.id } }
    },
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Usuário',
    },
    {
      name: 'lesson',
      type: 'relationship',
      relationTo: 'lessons',
      required: true,
      label: 'Aula',
    },
    {
      name: 'percentComplete',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      max: 100,
      label: '% Completo',
      admin: {
        description: 'Porcentagem assistida da aula',
      },
    },
    {
      name: 'completed',
      type: 'checkbox',
      defaultValue: false,
      label: 'Concluída',
      admin: {
        description: 'Marca como concluída quando > 90% assistido',
      },
    },
    {
      name: 'lastWatchedAt',
      type: 'date',
      label: 'Último Acesso',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'timeWatched',
      type: 'number',
      defaultValue: 0,
      label: 'Tempo Assistido (segundos)',
    },
    {
      name: 'currentTimestamp',
      type: 'number',
      defaultValue: 0,
      label: 'Posição Atual (segundos)',
      admin: {
        description: 'Onde parou na última vez',
      },
    },
  ],
  indexes: [
    {
      fields: ['user', 'lesson'],
      unique: true,
    },
  ],
}
```

---

### 4. Collection: Comments (Comentários)

```typescript
// apps/cms/src/collections/Comments.ts

export const Comments: CollectionConfig = {
  slug: 'comments',
  labels: {
    singular: 'Comentário',
    plural: 'Comentários',
  },
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['user', 'lesson', 'createdAt', 'approved'],
    group: 'Comunidade',
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Usuário',
    },
    {
      name: 'lesson',
      type: 'relationship',
      relationTo: 'lessons',
      required: true,
      label: 'Aula',
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      maxLength: 1000,
      label: 'Comentário',
    },
    {
      name: 'timestamp',
      type: 'number',
      label: 'Timestamp (segundos)',
      admin: {
        description: 'Momento do vídeo onde foi feito o comentário (opcional)',
      },
    },
    {
      name: 'parentComment',
      type: 'relationship',
      relationTo: 'comments',
      label: 'Responder a',
      admin: {
        description: 'Deixe vazio para comentário raiz',
      },
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: true,
      label: 'Aprovado',
      admin: {
        position: 'sidebar',
        description: 'Moderação de comentários',
      },
    },
    {
      name: 'likes',
      type: 'number',
      defaultValue: 0,
      label: 'Curtidas',
    },
  ],
}
```

---

### 5. Collection: Certificates (Certificados)

```typescript
// apps/cms/src/collections/Certificates.ts

export const Certificates: CollectionConfig = {
  slug: 'certificates',
  labels: {
    singular: 'Certificado',
    plural: 'Certificados',
  },
  admin: {
    useAsTitle: 'certificateNumber',
    defaultColumns: ['certificateNumber', 'user', 'curso', 'issuedAt'],
    group: 'Alunos',
  },
  fields: [
    {
      name: 'certificateNumber',
      type: 'text',
      required: true,
      unique: true,
      label: 'Número do Certificado',
      admin: {
        readOnly: true,
        description: 'Gerado automaticamente: CERT-20251116-001',
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Aluno',
    },
    {
      name: 'curso',
      type: 'relationship',
      relationTo: 'cursos',
      required: true,
      label: 'Curso',
    },
    {
      name: 'issuedAt',
      type: 'date',
      required: true,
      label: 'Data de Emissão',
      defaultValue: () => new Date(),
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'completionData',
      type: 'group',
      label: 'Dados de Conclusão',
      fields: [
        {
          name: 'totalLessons',
          type: 'number',
          required: true,
          label: 'Total de Aulas',
        },
        {
          name: 'completedLessons',
          type: 'number',
          required: true,
          label: 'Aulas Concluídas',
        },
        {
          name: 'totalHours',
          type: 'number',
          required: true,
          label: 'Carga Horária Total',
        },
        {
          name: 'finalGrade',
          type: 'number',
          min: 0,
          max: 100,
          label: 'Nota Final (opcional)',
        },
      ],
    },
    {
      name: 'pdfUrl',
      type: 'text',
      label: 'URL do PDF',
      admin: {
        readOnly: true,
        description: 'Gerado automaticamente após conclusão',
      },
    },
    {
      name: 'validated',
      type: 'checkbox',
      defaultValue: true,
      label: 'Certificado Válido',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create' && !data.certificateNumber) {
          const date = new Date()
          const dateStr = date.toISOString().split('T')[0].replace(/-/g, '')

          const lastCert = await payload.find({
            collection: 'certificates',
            where: {
              certificateNumber: {
                contains: `CERT-${dateStr}`,
              },
            },
            limit: 1,
            sort: '-createdAt',
          })

          const count = lastCert.docs.length > 0
            ? parseInt(lastCert.docs[0].certificateNumber.split('-')[2]) + 1
            : 1

          data.certificateNumber = `CERT-${dateStr}-${String(count).padStart(3, '0')}`
        }

        return data
      },
    ],
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === 'create') {
          // Gerar PDF do certificado
          await generateCertificatePDF(doc)

          // Enviar email com certificado
          await sendCertificateEmail(doc)
        }
      },
    ],
  },
}
```

---

## 🎬 Player de Vídeo

### Recomendação: Mux

**Por que Mux:**
- ✅ Upload direto via API
- ✅ Encoding automático em múltiplas resoluções
- ✅ DRM protection nativo
- ✅ Analytics detalhado
- ✅ Thumbnails automáticos
- ✅ Legendas/Closed Captions
- ✅ Baixa latência
- ✅ Player.js oficial

**Custos (Estimativa):**
- Encoding: $0.005/min
- Storage: $0.015/GB/mês
- Delivery: $0.01/GB
- **Total estimado:** ~$150-300/mês para 100 alunos ativos

**Integração:**

```typescript
// apps/web/components/VideoPlayer.tsx

'use client'

import { useEffect, useRef, useState } from 'react'
import Mux from '@mux/mux-player-react'

interface VideoPlayerProps {
  playbackId: string
  title: string
  onProgress?: (time: number, percent: number) => void
  onComplete?: () => void
  startTime?: number
}

export function VideoPlayer({
  playbackId,
  title,
  onProgress,
  onComplete,
  startTime = 0,
}: VideoPlayerProps) {
  const playerRef = useRef<HTMLVideoElement>(null)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const player = playerRef.current
    if (!player) return

    // Iniciar no timestamp salvo
    if (startTime > 0) {
      player.currentTime = startTime
    }

    // Salvar progresso a cada 5 segundos
    const interval = setInterval(() => {
      const time = player.currentTime
      const duration = player.duration
      const percent = (time / duration) * 100

      setCurrentTime(time)
      onProgress?.(time, percent)

      // Marcar como concluído quando > 90%
      if (percent > 90) {
        onComplete?.()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [startTime, onProgress, onComplete])

  return (
    <div className="relative w-full">
      <Mux
        ref={playerRef}
        playbackId={playbackId}
        metadata={{
          video_title: title,
        }}
        streamType="on-demand"
        controls
        autoPlay={false}
        className="w-full aspect-video rounded-lg"
      />

      {/* Controles personalizados (opcional) */}
      <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded text-white text-sm">
        {formatTime(currentTime)}
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
```

---

## 🔐 Autenticação

### NextAuth.js v5

```typescript
// apps/web/auth.ts

import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        // Verificar credenciais no Payload CMS
        const response = await fetch(
          `${process.env.PAYLOAD_API_URL}/users/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        )

        const data = await response.json()

        if (response.ok && data.user) {
          return {
            id: data.user.id,
            email: data.user.email,
            nome: data.user.nome,
            role: data.user.role,
            plano: data.user.plano,
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.plano = user.plano
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.role = token.role as string
      session.user.plano = token.plano as string
      return session
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/erro',
  },
})
```

---

## 📱 Páginas Principais

### 1. Dashboard do Aluno

```typescript
// apps/web/app/(aluno)/dashboard/page.tsx

import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { ProgressCard } from '@/components/aluno/ProgressCard'
import { ContinueWatching } from '@/components/aluno/ContinueWatching'
import { RecommendedCourses } from '@/components/aluno/RecommendedCourses'

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  // Buscar dados do aluno
  const [progressData, continueWatching, recommended] = await Promise.all([
    getProgressData(session.user.id),
    getContinueWatching(session.user.id),
    getRecommendedCourses(session.user.id),
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Olá, {session.user.nome}! 👋
      </h1>

      {/* Cards de progresso */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ProgressCard
          title="Cursos em Andamento"
          value={progressData.cursosEmAndamento}
          icon="📚"
        />
        <ProgressCard
          title="Horas Assistidas"
          value={`${progressData.horasAssistidas}h`}
          icon="⏱️"
        />
        <ProgressCard
          title="Certificados"
          value={progressData.certificados}
          icon="🏆"
        />
      </div>

      {/* Continue assistindo */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Continue Assistindo</h2>
        <ContinueWatching lessons={continueWatching} />
      </section>

      {/* Cursos recomendados */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Recomendados para Você</h2>
        <RecommendedCourses courses={recommended} />
      </section>
    </div>
  )
}
```

---

### 2. Player de Aula

```typescript
// apps/web/app/(aluno)/aula/[id]/page.tsx

import { auth } from '@/auth'
import { VideoPlayer } from '@/components/VideoPlayer'
import { LessonMaterials } from '@/components/aluno/LessonMaterials'
import { LessonComments } from '@/components/aluno/LessonComments'
import { LessonNavigation } from '@/components/aluno/LessonNavigation'

export default async function AulaPage({ params }: { params: { id: string } }) {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  // Buscar dados da aula
  const lesson = await getLesson(params.id)

  // Verificar se usuário tem acesso
  const hasAccess = await checkCourseAccess(session.user.id, lesson.curso.id)

  if (!hasAccess) {
    redirect('/cursos')
  }

  // Buscar progresso
  const progress = await getProgress(session.user.id, params.id)

  return (
    <div className="min-h-screen bg-black">
      {/* Player de vídeo */}
      <div className="w-full">
        <VideoPlayer
          playbackId={lesson.video.playbackId}
          title={lesson.titulo}
          startTime={progress?.currentTimestamp || 0}
          onProgress={async (time, percent) => {
            // Salvar progresso
            await updateProgress(session.user.id, params.id, {
              currentTimestamp: time,
              percentComplete: percent,
            })
          }}
          onComplete={async () => {
            // Marcar como concluída
            await markLessonComplete(session.user.id, params.id)
          }}
        />
      </div>

      {/* Conteúdo abaixo do player */}
      <div className="max-w-7xl mx-auto px-4 py-8 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna principal */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{lesson.titulo}</h1>

            <div
              className="prose prose-invert mb-8"
              dangerouslySetInnerHTML={{ __html: lesson.descricao }}
            />

            {/* Materiais */}
            {lesson.materiais && lesson.materiais.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  Materiais Complementares
                </h2>
                <LessonMaterials materiais={lesson.materiais} />
              </section>
            )}

            {/* Comentários */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Comentários</h2>
              <LessonComments lessonId={params.id} userId={session.user.id} />
            </section>
          </div>

          {/* Sidebar - Navegação de aulas */}
          <div className="lg:col-span-1">
            <LessonNavigation
              cursoId={lesson.curso.id}
              currentLessonId={params.id}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## 📊 Analytics & Métricas

### Eventos a Rastrear

```typescript
// Engajamento
- video_play
- video_pause
- video_complete
- lesson_started
- lesson_completed
- course_started
- course_completed

// Interação
- comment_created
- material_downloaded
- certificate_generated

// Conversão
- subscription_started
- subscription_cancelled
- subscription_renewed

// Performance
- video_buffering
- video_quality_changed
- video_error
```

---

## 🚀 Roadmap de Implementação

### Fase 3.1: Infraestrutura Base (4 semanas)

**Semana 1-2: Autenticação**
- [ ] Configurar NextAuth.js
- [ ] Criar páginas de login/registro
- [ ] Implementar proteção de rotas
- [ ] Integrar com Payload CMS

**Semana 3-4: Collections CMS**
- [ ] Criar collection Lessons
- [ ] Criar collection Progress
- [ ] Criar collection Comments
- [ ] Criar collection Certificates
- [ ] Atualizar collection Users

---

### Fase 3.2: Player & Vídeos (4 semanas)

**Semana 5-6: Integração Mux**
- [ ] Criar conta Mux
- [ ] Configurar upload de vídeos
- [ ] Implementar player de vídeo
- [ ] Sistema de progresso
- [ ] Salvar posição assistida

**Semana 7-8: Recursos do Player**
- [ ] Legendas/Closed Captions
- [ ] Controle de qualidade
- [ ] Controle de velocidade
- [ ] Thumbnails dinâmicos
- [ ] Picture-in-Picture

---

### Fase 3.3: Área do Aluno (6 semanas)

**Semana 9-10: Dashboard**
- [ ] Dashboard principal
- [ ] Cards de progresso
- [ ] Continue assistindo
- [ ] Cursos recomendados

**Semana 11-12: Páginas de Curso**
- [ ] Listagem de cursos
- [ ] Página individual do curso
- [ ] Navegação de aulas
- [ ] Materiais complementares

**Semana 13-14: Progresso & Certificados**
- [ ] Sistema de progresso
- [ ] Geração de certificados
- [ ] Download de certificados
- [ ] Página de certificados

---

### Fase 3.4: Comunidade (3 semanas)

**Semana 15-16: Comentários**
- [ ] Sistema de comentários
- [ ] Comentários por timestamp
- [ ] Respostas a comentários
- [ ] Curtidas

**Semana 17: Moderação**
- [ ] Sistema de moderação
- [ ] Aprovação de comentários
- [ ] Denúncias
- [ ] Banimento de usuários

---

### Fase 3.5: Finalização (3 semanas)

**Semana 18-19: Testes**
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Testes E2E
- [ ] Testes de carga

**Semana 20: Deploy & Monitoramento**
- [ ] Deploy em produção
- [ ] Configurar analytics
- [ ] Configurar monitoramento
- [ ] Treinamento da equipe

---

## 💰 Estimativa de Custos

### Custos Mensais (100 alunos ativos)

| Serviço | Custo Mensal | Observações |
|---------|--------------|-------------|
| **Mux** | $200 | Encoding + storage + delivery |
| **Supabase** | $25 | PostgreSQL + Auth + Realtime |
| **Cloudinary** | $0 | Tier gratuito (10GB) |
| **Brevo** | $0 | Tier gratuito (300 emails/dia) |
| **Vercel** | $20 | Pro tier |
| **VPS Hostinger** | $15 | CMS hosting |
| **Total** | **~$260/mês** | Para 100 alunos |

**Escalando para 500 alunos:**
- Mux: ~$600/mês
- Supabase: $99/mês (Pro)
- Cloudinary: $89/mês (Plus)
- **Total: ~$850/mês**

---

## 📚 Recursos & Referências

### Vídeo Hosting
- [Mux Docs](https://docs.mux.com/)
- [Mux Player React](https://github.com/muxinc/elements/tree/main/packages/mux-player-react)
- [Cloudflare Stream](https://developers.cloudflare.com/stream/)

### Autenticação
- [NextAuth.js v5](https://authjs.dev/)
- [Payload Auth](https://payloadcms.com/docs/authentication/overview)

### UI/UX
- [Video.js](https://videojs.com/)
- [Plyr](https://plyr.io/)

---

**Última Atualização:** 16/11/2025
**Versão:** 1.0
**Status:** 🔵 Planejado para Fase 3
