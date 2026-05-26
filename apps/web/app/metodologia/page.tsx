import type { Metadata } from 'next'
import { Target, BookOpen, RefreshCw, Layers, Users, MessageCircle, Globe, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Metodologia',
  description:
    'Conheça a metodologia Nutrindo Juntos: ciência, prática clínica e acompanhamento próximo para formar nutricionistas com segurança e raciocínio clínico.',
}

const steps = [
  {
    icon: BookOpen,
    number: '01',
    title: 'Base científica + aplicação real',
    text: 'Toda a metodologia é fundamentada em evidência científica atualizada, traduzida para a prática clínica. Você aprende o porquê, mas principalmente o como aplicar com segurança no paciente real.',
  },
  {
    icon: RefreshCw,
    number: '02',
    title: 'Conteúdo personalizável e atualizado',
    text: 'Nenhuma turma é igual à anterior. As aulas ao vivo são constantemente atualizadas conforme novas evidências científicas, demandas reais dos alunos e dificuldades práticas da turma. Isso garante um ensino dinâmico, atual e personalizado.',
  },
  {
    icon: Layers,
    number: '03',
    title: 'Multiformato de aprendizado',
    items: [
      'Aulas gravadas (base teórica estruturada)',
      'Aulas ao vivo (atualização + aprofundamento)',
      'Materiais extras (guias, resumos, protocolos, artigos científicos)',
      'Exercícios práticos',
      'Casos clínicos quinzenais',
    ],
    footer: 'Aqui, você não só assiste — você raciocina, aplica e evolui.',
  },
  {
    icon: Users,
    number: '04',
    title: 'Mentoria em grupo e acompanhamento próximo',
    text: 'O aluno não fica perdido.',
    items: [
      'Mentorias em grupo para dúvidas clínicas',
      'Discussões de casos reais',
      'Direcionamento estratégico de condutas',
    ],
    footer: 'É suporte para transformar conhecimento em decisão clínica segura.',
  },
  {
    icon: MessageCircle,
    number: '05',
    title: 'Suporte ativo e contínuo',
    text: 'Nada de esperar horas (ou dias) por resposta.',
    items: [
      'Grupo ativo no WhatsApp',
      'Suporte rápido e direto',
      'Troca constante entre alunos e professores',
    ],
    footer: 'Você está sempre amparado durante a jornada.',
  },
  {
    icon: Globe,
    number: '06',
    title: 'Comunidade que impulsiona crescimento',
    text: 'A NJ não é só um curso — é uma comunidade. Aqui você encontra:',
    items: [
      'Troca entre colegas',
      'Networking real',
      'Incentivo contínuo',
      'Ambiente de crescimento',
    ],
    footer: 'Uma rede que te fortalece e te posiciona como profissional.',
  },
  {
    icon: GraduationCap,
    number: '07',
    title: 'Formação estratégica do nutricionista',
    text: 'Mais do que conteúdo técnico, a NJ desenvolve:',
    items: [
      'Raciocínio clínico',
      'Segurança no atendimento',
      'Visão prática da profissão',
    ],
    footer: 'O objetivo não é só ensinar… é formar um nutricionista que sabe o que está fazendo — e por quê.',
  },
]

export default function MetodologiaPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-graphite py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-graphite via-graphite to-primary-900/30" />
        <div className="container relative mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-3 w-3 rounded-full bg-primary-500" />
            <span className="font-serif text-lg font-semibold text-primary-400">
              Como ensinamos
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold text-white lg:text-6xl mb-6">
            Metodologia <span className="text-primary-500">Nutrindo Juntos</span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-neutral-300 lg:text-xl">
            A Nutrindo Juntos foi construída para formar nutricionistas com segurança,
            raciocínio clínico e posicionamento profissional, unindo ciência, prática
            e acompanhamento próximo.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base font-medium text-primary-400 italic">
            Aqui, o aluno não recebe apenas conteúdo — ele é lapidado ao longo do processo.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:gap-16">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  className="grid gap-6 lg:grid-cols-12 lg:gap-12 items-start"
                >
                  {/* Number + Icon */}
                  <div className="lg:col-span-3 flex items-center gap-4">
                    <span className="font-display text-6xl font-bold text-primary-500/20 lg:text-7xl">
                      {step.number}
                    </span>
                    <div className="h-14 w-14 flex-shrink-0 rounded-2xl bg-primary-50 flex items-center justify-center">
                      <Icon className="h-7 w-7 text-primary-500" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-9">
                    <h2 className="font-display text-2xl font-bold text-graphite lg:text-3xl mb-4">
                      {step.title}
                    </h2>

                    {step.text && (
                      <p className="text-lg leading-relaxed text-neutral-600 mb-4">
                        {step.text}
                      </p>
                    )}

                    {step.items && (
                      <ul className="space-y-2 mb-4">
                        {step.items.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-lg text-neutral-600">
                            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {step.footer && (
                      <p className="text-base font-medium italic text-graphite">
                        {step.footer}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
