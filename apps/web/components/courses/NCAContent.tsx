import { BookOpen, FlaskConical, FileSearch, HeartPulse, Users, ClipboardList, Gift, Clock, Award } from 'lucide-react'

const modules = [
  {
    number: 1,
    title: 'Bioquímica e Biodisponibilidade',
    subtitle: 'Entenda como o organismo funciona e como você pode usar suplementos em cada situação.',
    description: 'Bioquímica básica aplicada à Nutrição — entenda os fundamentos bioquímicos que impactam o dia a dia do nutricionista.',
    items: [
      'Digestão e absorção de nutrientes',
      'Vias metabólicas energéticas',
      'Bioquímica do emagrecimento e do acúmulo de gordura',
    ],
    icon: FlaskConical,
  },
  {
    number: 2,
    title: 'Biodisponibilidade e Genética aplicada à Nutrição',
    subtitle: 'Conecte nutrientes e genes para estratégias mais personalizadas.',
    description: null,
    items: [
      'Fatores que interferem na absorção e eficácia dos nutrientes',
      'Genética nutricional aplicada à prática clínica',
    ],
    icon: BookOpen,
  },
  {
    number: 3,
    title: 'Interpretação de exames laboratoriais',
    subtitle: 'Saiba como avaliar exames bioquímicos, identificar disfunções e transformar dados em decisões nutricionais reais, profiláticas e de tratamento.',
    description: null,
    items: [
      'Hemograma, Leucograma, Lipidograma',
      'Glicemia, Tireoide, Hepático, Renal e Cardiológico',
      'Aulas teóricas + práticas (com leitura conjunta de exames reais)',
    ],
    icon: FileSearch,
  },
  {
    number: 4,
    title: 'Fisiopatologias',
    subtitle: 'Entenda o papel do nutricionista e o impacto da sua conduta no tratamento e prevenção de patologias comuns.',
    description: 'Fisiopatologia aplicada à Nutrição — raciocínio clínico com base nas principais disfunções.',
    items: [
      'Cardiopatias, doenças renais, hepáticas e gastrointestinais',
      'Intolerâncias e reações ao trigo e leite',
    ],
    icon: HeartPulse,
  },
  {
    number: 5,
    title: 'Pesquisa e Humanização no Cuidado',
    subtitle: 'A base ética e científica para uma prática segura e humana.',
    description: null,
    items: [
      'Estratégias de pesquisa baseada em evidências',
      'Nutrição com empatia, escuta e protagonismo do paciente',
    ],
    icon: Users,
  },
  {
    number: 6,
    title: 'Avaliação Nutricional Completa',
    subtitle: 'Construa sua consulta de forma estratégica, do início ao fim.',
    description: null,
    items: [
      'Anamnese, avaliação dietética e física',
      'Interpretação bioquímica integrada',
    ],
    icon: ClipboardList,
  },
]

const bonusContent = {
  title: 'Aulas Bônus',
  subtitle: 'Sinais, Sintomas e Micronutrientes',
  items: [
    'Diagnóstico nutricional por sinais clínicos',
    'Microbiota, disbiose e assimilação',
    'Vitaminas, minerais e compostos bioativos na prática',
  ],
  extra: 'Bônus: aulas da pós-graduação VP ao vivo, semanalmente, por 3 meses.',
}

const stats = [
  { value: '100%', label: 'Dos alunos relatam mais confiança' },
  { value: '+ de 3.000', label: 'Profissionais transformados' },
  { value: '+ de 15K', label: 'Pacientes atendidos pelos alunos' },
]

export function NCAContent() {
  return (
    <div className="space-y-16">
      {/* Intro */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-graphite">
            Ainda sente que falta clareza para aplicar o que está aprendendo na faculdade?
          </h2>
          <p className="text-lg leading-relaxed text-neutral-600">
            O curso de Nutrição Clínica Aplicada foi criado justamente para te ajudar a dominar
            o básico muito bem feito, com fundamentos sólidos e aplicáveis no dia a dia da clínica.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-graphite">
            Sente que falta algo para praticar Nutrição com confiança?
          </h2>
          <p className="text-lg leading-relaxed text-neutral-600">
            No N.C.A. você não só une o aprendizado acadêmico com aplicação prática, otimizando
            tempo e adquirindo segurança desde já, como também consegue construir a confiança que
            faltava no seu próprio raciocínio clínico.
          </p>
        </div>

        <div className="rounded-xl bg-primary-50 p-6 border-l-4 border-primary-500">
          <p className="text-lg font-semibold text-primary-900">
            É o passo que faltava para transformar teoria em prática com confiança.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-neutral-200 bg-white p-6 text-center shadow-sm"
          >
            <p className="font-display text-3xl font-bold text-primary-600">{stat.value}</p>
            <p className="mt-2 text-sm text-neutral-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* O que é o NCA */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-graphite">O que é o N.C.A.?</h2>
        <p className="text-lg leading-relaxed text-neutral-600">
          Um curso intensivo e 100% prático de Nutrição Clínica, pensado para quem quer ir além
          da teoria. Ideal para graduandos, recém-formados e profissionais que desejam transicionar
          de carreira e ter segurança no atendimento: você aprende a interpretar exames, calcular
          dietas, prescrever suplementação e montar condutas nutricionais com confiança.
        </p>
        <p className="text-lg font-medium text-graphite">
          No N.C.A, você não só estuda — você realmente pratica e domina o que aprende.
        </p>
      </div>

      {/* Módulos */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-graphite">Módulos</h2>

        <div className="space-y-6">
          {modules.map((mod) => {
            const Icon = mod.icon
            return (
              <div
                key={mod.number}
                className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-4 p-6">
                  {/* Number & Icon */}
                  <div className="flex flex-shrink-0 flex-col items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white">
                      {mod.number}
                    </span>
                    <Icon className="h-5 w-5 text-primary-400" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <h3 className="text-lg font-bold text-graphite">{mod.title}</h3>
                    <p className="text-sm leading-relaxed text-neutral-600">{mod.subtitle}</p>

                    {mod.description && (
                      <p className="text-sm font-medium text-primary-700">{mod.description}</p>
                    )}

                    <ul className="space-y-1.5">
                      {mod.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Bônus */}
          <div className="overflow-hidden rounded-xl border-2 border-dashed border-amber-300 bg-amber-50 shadow-sm">
            <div className="flex items-start gap-4 p-6">
              <div className="flex flex-shrink-0 flex-col items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
                  <Gift className="h-5 w-5" />
                </span>
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-graphite">{bonusContent.title}</h3>
                  <span className="rounded-full bg-amber-200 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                    BÔNUS
                  </span>
                </div>
                <p className="text-sm font-medium text-amber-800">{bonusContent.subtitle}</p>

                <ul className="space-y-1.5">
                  {bonusContent.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="rounded-lg bg-amber-100 p-3 text-sm font-medium text-amber-900">
                  {bonusContent.extra}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carga Horária */}
      <div className="rounded-xl bg-graphite p-8 text-white">
        <h2 className="mb-6 text-center text-xl font-bold uppercase tracking-wider">
          Carga Horária Total
        </h2>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-12">
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-primary-400" />
            <span className="text-lg font-semibold">20 horas de conteúdo total</span>
          </div>
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-primary-400" />
            <span className="text-lg font-semibold">Certificado emitido ao final</span>
          </div>
        </div>
      </div>
    </div>
  )
}
