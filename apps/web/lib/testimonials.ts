import fs from 'fs'
import path from 'path'

export interface Testimonial {
  id: string
  image: string
  alt: string
}

export interface VideoTestimonial {
  id: string
  video: string
  thumbnail: string
  alt: string
}

/**
 * Carrega todas as imagens de depoimentos da pasta public
 * Roda no servidor (Server Component)
 */
export function getTestimonialImages(): Testimonial[] {
  try {
    const imagesDir = path.join(process.cwd(), 'public/images/testimonials/images')

    // Verifica se a pasta existe
    if (!fs.existsSync(imagesDir)) {
      console.warn('Pasta de depoimentos não encontrada:', imagesDir)
      return []
    }

    // Lê todos os arquivos da pasta
    const files = fs.readdirSync(imagesDir)

    // Filtra apenas imagens (jpg, jpeg, png, webp)
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext)
    })

    // Mapeia para o formato esperado
    const testimonials: Testimonial[] = imageFiles.map((file, index) => ({
      id: `testimonial-${index + 1}`,
      image: `/images/testimonials/images/${file}`,
      alt: `Depoimento real de cliente ${index + 1}`
    }))

    console.log(`✅ Carregadas ${testimonials.length} imagens de depoimentos`)

    return testimonials
  } catch (error) {
    console.error('Erro ao carregar imagens de depoimentos:', error)
    return []
  }
}

/**
 * Carrega todos os vídeos de depoimentos da pasta public
 * Roda no servidor (Server Component)
 */
export function getTestimonialVideos(): VideoTestimonial[] {
  try {
    const videosDir = path.join(process.cwd(), 'public/images/testimonials/videos')

    // Verifica se a pasta existe
    if (!fs.existsSync(videosDir)) {
      console.warn('Pasta de vídeos não encontrada:', videosDir)
      return []
    }

    // Lê todos os arquivos da pasta
    const files = fs.readdirSync(videosDir)

    // Filtra apenas vídeos (mp4, webm)
    const videoFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.mp4', '.webm'].includes(ext)
    })

    // Mapeia para o formato esperado
    const videos: VideoTestimonial[] = videoFiles.map((file, index) => {
      const nameWithoutExt = path.parse(file).name
      const thumbnailPath = `/images/testimonials/videos/${nameWithoutExt}-thumb.jpg`

      return {
        id: `video-${index + 1}`,
        video: `/images/testimonials/videos/${file}`,
        thumbnail: thumbnailPath,
        alt: `Vídeo depoimento de cliente ${index + 1}`
      }
    })

    console.log(`✅ Carregados ${videos.length} vídeos de depoimentos`)

    return videos
  } catch (error) {
    console.error('Erro ao carregar vídeos de depoimentos:', error)
    return []
  }
}
