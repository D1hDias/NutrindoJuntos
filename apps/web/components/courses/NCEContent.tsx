import { Users, Baby, Leaf, Briefcase, Gift, Clock, Award, GraduationCap, AlertTriangle, Target, CheckCircle2 } from 'lucide-react'

const modules = [
  {
    number: 1,
    title: 'Nutrição em Adultos e Terceira Idade',
    subtitle: 'Do emagrecimento à geriatria: protocolos avançados para todas as fases da vida adulta.',
    description: null,
    items: [
      'Emagrecimento e obesidade',
      'Tipos de dietas e protocolos',
      'Nutrição esportiva (feminina e masculina)',
      'Infertilidade masculina e feminina',
      'Menopausa e Geriatria',
      'Modulação intestinal, suplementação e fitoterapia',
      'Vias metabólicas energéticas',
    ],
    icon: Users,
  },
  {
    number: 2,
    title: 'Nutrição Materno-Infantil',
    subtitle: 'Da pré-concepção à pediatria: cuidado nutricional completo para mãe e bebê.',
    description: null,
    items: [
      'Nutrição na pré-concepção',
      'Gestação e saúde materna',
      'Nutriz e aleitamento materno',
      'Neonatologia e fórmulas infantis',
      'Pediatria e introdução e seletividade alimentar',
      'Modulação intestinal, suplementação e fitoterapia',
    ],
    icon: Baby,
  },
  {
    number: 3,
    title: 'Nutrição Integrativa',
    subtitle: 'Amplie sua visão clínica com abordagens complementares e personalizadas.',
    description: null,
    items: [
      'Nutrição comportamental',
      'Nutrição ortomolecular e funcional',
      'Nutrição e genética',
    ],
    icon: Leaf,
  },
  {
    number: 4,
    title: 'Gestão da Carreira',
    subtitle: 'Transforme seu conhecimento clínico em uma carreira rentável e sustentável.',
    description: null,
    items: [
      'Vendas, captação e marketing',
      'Experiência do cliente e fidelização',
      'Gestão financeira',
    ],
    icon: Briefcase,
  },
]

const bonusContent = {
  title: 'Aulas Bônus',
  subtitle: 'Mentorias, Masterclasses e Materiais Exclusivos',
  items: [
    'Aulas da pós-graduação VP semanais por 3 meses',
    '2 Mentorias em grupo',
    '1 Mentoria para criação de grupos de desafios',
    '1 Mentoria individual de carreira',
    'Masterclass em gestão financeira e de carreira, com especialistas na área',
    'Aula de posicionamento e branding, com especialista convidada',
    'Aula de nutrição comportamental, com psicóloga convidada',
    'Materiais de apoio exclusivos',
  ],
}

const stats = [
  { value: '100%', label: 'Dos alunos relatam mais confiança nas condutas' },
  { value: '+ de 3K', label: 'Profissionais transformados' },
  { value: '+ de 20K', label: 'Pacientes atendidos e fidelizados pelos alunos' },
]

const targetAudience = [
  'Já domina a base clínica, mas quer ir além',
  'Busca crescer em atendimentos, captação e fidelização',
  'Deseja gerenciar a própria carreira com mais estratégia',
  'Quer se aprofundar em protocolos nutricionais avançados',
]

export function NCEContent() {
  return (
    <div className="space-y-16">
      {/* A Realidade */}
      <div className="space-y-6">
        <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-6">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <h3 className="text-lg font-bold text-amber-900">A Realidade</h3>
          </div>
          <p className="text-base leading-relaxed text-amber-800">
            O Brasil é o 2o pais com mais casos de burnout no trabalho, somando 30 milhões de registros (ANAMT, 2022).
            Nós estamos no centro de um cenário onde muitos nutricionistas ainda saem da graduação inseguros, sem
            clareza de como viver de fato da Nutrição, além de sobrecarregados pela própria autocobrança: a pressão em
            já começar a trabalhar e construir o mais breve possível uma carreira sólida e próspera, levam ao
            esgotamento mental, exaustão emocional, desistência e baixa qualidade de vida.
          </p>
        </div>
      </div>

      {/* O que esperar do NCE */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-graphite">O que esperar do NCE?</h2>
        <p className="text-lg leading-relaxed text-neutral-600">
          Se você já sentiu que sua formação não foi suficiente para te fazer alavancar na carreira clínica
          ou sente que por mais que faça de tudo que já aprendeu em outros lugares, nada realmente funcionou
          para te deixar mais produtivo(a), seguro(a) nas condutas e hábil em gerenciar a própria carreira,
          o NCE foi moldado justamente para mudar esse cenário.
        </p>
        <div className="rounded-xl bg-[#6d4d88]/10 p-6 border-l-4 border-[#6d4d88]">
          <p className="text-lg font-semibold text-[#6d4d88]">
            Sem promessas vazias, com muita entrega prática.
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
            <p className="font-display text-3xl font-bold text-[#6d4d88]">{stat.value}</p>
            <p className="mt-2 text-sm text-neutral-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Por quê fazer o NCE */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="h-6 w-6 text-[#6d4d88]" />
          <h2 className="text-2xl font-bold text-graphite">Por quê fazer o NCE?</h2>
        </div>
        <p className="text-lg leading-relaxed text-neutral-600">
          Ele é mais do que um passo na sua formação: é um compromisso nosso com a transformação da sua
          prática e da sua visão como nutricionista e futuro(a) empreendedor(a).
        </p>
        <p className="text-lg leading-relaxed text-neutral-600">
          Aqui, não falamos apenas de técnicas e estratégias, mas também de valores, de comprometimento
          com o paciente, de apoio entre colegas e de uma construção bidirecional, com ferramentas que
          vão ser aplicadas de forma personalizada por cada um.
        </p>
        <p className="text-lg leading-relaxed text-neutral-600">
          Queremos construir juntos um caminho sustentável e de sucesso para a nossa profissão.
        </p>
        <div className="rounded-xl bg-[#6d4d88]/5 p-6">
          <p className="text-base leading-relaxed text-neutral-700">
            É um espaço que visa proporcionar: a consolidação da sua segurança profissional, crescimento
            em comunidade e protagonismo em uma carreira promissora, que gera impacto real na vida das
            pessoas ao seu redor e, ao mesmo tempo, na sua própria trajetória.
          </p>
        </div>
      </div>

      {/* Para quem é */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-graphite">Para quem é</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {targetAudience.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#6d4d88]" />
              <span className="text-sm leading-relaxed text-neutral-700">{item}</span>
            </div>
          ))}
        </div>
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
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6d4d88] text-sm font-bold text-white">
                      {mod.number}
                    </span>
                    <Icon className="h-5 w-5 text-[#6d4d88]/60" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <h3 className="text-lg font-bold text-graphite">{mod.title}</h3>
                    <p className="text-sm leading-relaxed text-neutral-600">{mod.subtitle}</p>

                    {mod.description && (
                      <p className="text-sm font-medium text-[#6d4d88]">{mod.description}</p>
                    )}

                    <ul className="space-y-1.5">
                      {mod.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#6d4d88]/60" />
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
                    BONUS
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carga Horária */}
      <div className="rounded-xl bg-[#6d4d88] p-8 text-white">
        <h2 className="mb-6 text-center text-xl font-bold uppercase tracking-wider">
          Carga Horária Total
        </h2>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-12">
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-amber-300" />
            <span className="text-lg font-semibold">40 horas de conteúdo total</span>
          </div>
          <div className="flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-amber-300" />
            <span className="text-lg font-semibold">Certificado MEC emitido ao final</span>
          </div>
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-amber-300" />
            <span className="text-lg font-semibold">1 ano de acesso</span>
          </div>
        </div>
      </div>
    </div>
  )
}
