import { Metadata } from 'next'
import Image from 'next/image'
import { Mail } from 'lucide-react'
import { TeamCarousel } from '@/components/equipe/TeamCarousel'
import type { TeamMember } from '@/components/equipe/TeamCard'
import { NewsletterSection } from '@/components/sections/NewsletterSection'

export const metadata: Metadata = {
  title: 'Nossa Equipe',
  description: 'Conheça os profissionais que fazem parte do NUTRINDO JUNTOS',
}

// TODO: Fetch from CMS when team collection is populated
async function getTeamMembers(): Promise<TeamMember[]> {
  // Temporary hardcoded data until CMS team is created
  return [
    {
      id: '1',
      name: 'Ana Paula Silva',
      role: 'Nutricionista Clínica',
      bio: 'Especialista em nutrição clínica com mais de 10 anos de experiência. Apaixonada por ensinar e compartilhar conhecimento.',
      expertise: ['Nutrição Clínica', 'Educação Nutricional', 'Atendimento Personalizado'],
      image: null,
      social: {
        email: 'ana@nutrindojuntos.com.br',
        linkedin: 'https://linkedin.com/in/anapaula',
      },
    },
    {
      id: '2',
      name: 'Carlos Eduardo Santos',
      role: 'Nutricionista Esportivo',
      bio: 'Especialista em nutrição esportiva, atende atletas de alto rendimento e amadores que buscam melhor performance.',
      expertise: ['Nutrição Esportiva', 'Performance', 'Suplementação'],
      image: null,
      social: {
        email: 'carlos@nutrindojuntos.com.br',
        instagram: 'https://instagram.com/carloseduardo',
      },
    },
    {
      id: '3',
      name: 'Mariana Oliveira',
      role: 'Nutricionista Materno-Infantil',
      bio: 'Dedicada à nutrição materno-infantil, ajudando mães e crianças a desenvolverem hábitos alimentares saudáveis.',
      expertise: ['Nutrição Infantil', 'Gestantes', 'Lactação'],
      image: null,
      social: {
        email: 'mariana@nutrindojuntos.com.br',
        linkedin: 'https://linkedin.com/in/marianaoliveira',
        instagram: 'https://instagram.com/mariana.nutri',
      },
    },
    {
      id: '4',
      name: 'Rafael Costa',
      role: 'Nutricionista Funcional',
      bio: 'Especialista em nutrição funcional e medicina integrativa, focado em tratamentos personalizados e preventivos.',
      expertise: ['Nutrição Funcional', 'Fitoterapia', 'Modulação Intestinal'],
      image: null,
      social: {
        email: 'rafael@nutrindojuntos.com.br',
        linkedin: 'https://linkedin.com/in/rafaelcosta',
      },
    },
    {
      id: '5',
      name: 'Juliana Mendes',
      role: 'Nutricionista Comportamental',
      bio: 'Trabalha com a relação emocional com a comida, ajudando pessoas a desenvolverem uma alimentação consciente.',
      expertise: ['Nutrição Comportamental', 'Mindful Eating', 'Transtornos Alimentares'],
      image: null,
      social: {
        email: 'juliana@nutrindojuntos.com.br',
        instagram: 'https://instagram.com/juliana.comportamental',
        website: 'https://julianamendes.com.br',
      },
    },
    {
      id: '6',
      name: 'Pedro Henrique Lima',
      role: 'Nutricionista Vegano',
      bio: 'Especialista em nutrição plant-based, auxilia na transição para uma alimentação vegana equilibrada e saudável.',
      expertise: ['Nutrição Vegana', 'Plant-Based', 'Suplementação Vegana'],
      image: null,
      social: {
        email: 'pedro@nutrindojuntos.com.br',
        instagram: 'https://instagram.com/pedro.vegano',
      },
    },
    {
      id: '7',
      name: 'Beatriz Almeida',
      role: 'Nutricionista Estética',
      bio: 'Focada em nutrição estética e longevidade, promove saúde e beleza de dentro para fora.',
      expertise: ['Nutrição Estética', 'Anti-aging', 'Saúde da Pele'],
      image: null,
      social: {
        email: 'beatriz@nutrindojuntos.com.br',
        linkedin: 'https://linkedin.com/in/beatrizalmeida',
        instagram: 'https://instagram.com/bia.nutriestetica',
      },
    },
    {
      id: '8',
      name: 'Lucas Ferreira',
      role: 'Nutricionista Oncológico',
      bio: 'Especializado em nutrição oncológica, auxilia pacientes em tratamento do câncer com abordagem humanizada.',
      expertise: ['Nutrição Oncológica', 'Cuidados Paliativos', 'Imunonutrição'],
      image: null,
      social: {
        email: 'lucas@nutrindojuntos.com.br',
        linkedin: 'https://linkedin.com/in/lucasferreira',
      },
    },
  ]
}

export default async function EquipePage() {
  const teamMembers = await getTeamMembers()

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Nossa Equipe
            </h1>
            <p className="text-lg text-gray-600 md:text-xl">
              Conheça os profissionais dedicados que fazem parte do NUTRINDO JUNTOS e estão comprometidos em transformar vidas através da nutrição.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-one relative overflow-visible bg-gradient-to-b from-white via-green-50/30 to-white py-20">
        {/* Decorative Shapes - Higher z-index to appear above content */}
        <div className="team-one__shape-1 absolute left-10 top-20 z-30 opacity-60">
          <Image
            src="/images/shapes/team-one-shape-1.webp"
            alt=""
            width={120}
            height={120}
            className="animate-pulse"
          />
        </div>
        <div className="team-one__shape-2 absolute right-10 top-40 z-30 float-bob-y opacity-60">
          <Image
            src="/images/shapes/team-one-shape-2.webp"
            alt=""
            width={100}
            height={100}
          />
        </div>
        <div className="team-one__shape-3 absolute bottom-20 left-1/4 z-30 opacity-40">
          <Image
            src="/images/shapes/team-one-shape-3.webp"
            alt=""
            width={80}
            height={80}
          />
        </div>
        <div className="team-one__shape-4 absolute right-1/4 top-1/2 z-30 float-bob-x opacity-60">
          <Image
            src="/images/shapes/team-one-shape-4.webp"
            alt=""
            width={90}
            height={90}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          {/* Section Title */}
          <div className="mb-16 text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">
              <div className="h-2 w-2 rounded-full bg-green-600"></div>
              <span className="text-sm font-semibold uppercase tracking-wide text-green-700">
                Nossa Equipe
              </span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Conheça os Profissionais <br />
              Apaixonados por{' '}
              <span className="relative inline-block">
                Transformar Vidas
                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full text-green-400"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C50 3 150 3 198 10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
          </div>

          {/* Team Carousel */}
          {teamMembers.length > 0 ? (
            <TeamCarousel members={teamMembers} />
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-gray-600">
                Nossa equipe está crescendo! Em breve você conhecerá os profissionais que fazem
                parte do NUTRINDO JUNTOS.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* CTA Section */}
      <section className="bg-green-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Quer fazer parte da nossa equipe?</h2>
            <p className="mb-6 text-green-50">
              Estamos sempre em busca de profissionais apaixonados por nutrição e educação.
            </p>
            <a
              href="mailto:atendimento@nutrindojuntos.com.br"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-green-600 transition-colors hover:bg-green-50"
            >
              <Mail className="h-5 w-5" />
              Entre em contato
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
