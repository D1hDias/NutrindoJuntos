import { Sun, Coffee, Moon, MapPin, Clock, Award, Users, Laptop } from 'lucide-react'

const schedule = [
  {
    period: 'Manhã',
    icon: Sun,
    theme: 'Domínio da Ferramenta',
    items: [
      'Como usar o Webdiet do zero ao avançado',
      'Organização e montagem dos seus materiais de atendimento',
      'Gestão do atendimento dentro da plataforma',
      'Otimização de tempo no consultório',
    ],
  },
  {
    period: 'Intervalo',
    icon: Coffee,
    theme: 'Coffee Break e Networking',
    items: ['Pausa para café e troca de experiências entre os participantes'],
  },
  {
    period: 'Tarde',
    icon: Moon,
    theme: 'Prática Clínica em Grupos',
    items: [
      'Cálculo dietético passo a passo',
      'Prescrição de dieta na prática, realizada pelos próprios participantes',
      'Debate e análise de raciocínio clínico aplicado ao atendimento',
    ],
  },
]

const highlights = [
  { icon: Award, label: 'Certificado de participação incluso' },
  { icon: Users, label: 'Turma reduzida para melhor aproveitamento' },
  { icon: Laptop, label: 'Realizado em parceria oficial com a Webdiet' },
]

export function WebdietContent() {
  return (
    <div className="space-y-12">
      {/* Intro */}
      <div className="space-y-4">
        <p className="text-lg leading-relaxed text-neutral-600">
          Uma imersão presencial desenvolvida em parceria com a Webdiet, voltada para nutricionistas
          que querem aprender a usar o software com profundidade e, na mesma jornada, aplicar esse
          conhecimento diretamente na prática clínica — com segurança e método.
        </p>
        <div className="rounded-xl border-l-4 border-primary-500 bg-primary-50 p-5">
          <p className="font-semibold text-primary-900">
            Em um único dia, você vai do domínio da ferramenta ao raciocínio clínico aplicado —
            com teoria, prática e troca de experiências entre profissionais.
          </p>
        </div>
      </div>

      {/* Destaques */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {highlights.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
          >
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" />
            <span className="text-sm font-medium text-neutral-700">{label}</span>
          </div>
        ))}
      </div>

      {/* Cronograma */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-graphite">Cronograma do Dia</h2>
        <div className="space-y-4">
          {schedule.map((block) => {
            const Icon = block.icon
            const isBreak = block.period === 'Intervalo'
            return (
              <div
                key={block.period}
                className={`overflow-hidden rounded-xl border shadow-sm ${
                  isBreak
                    ? 'border-amber-200 bg-amber-50'
                    : 'border-neutral-200 bg-white'
                }`}
              >
                <div className="flex items-start gap-4 p-6">
                  <div className="flex shrink-0 flex-col items-center gap-1">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        isBreak ? 'bg-amber-100' : 'bg-primary-100'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isBreak ? 'text-amber-600' : 'text-primary-600'}`} />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                      {block.period}
                    </span>
                  </div>

                  <div className="flex-1 space-y-3">
                    <h3 className="text-lg font-bold text-graphite">{block.theme}</h3>
                    <ul className="space-y-2">
                      {block.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-neutral-600">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Local e Horário */}
      <div className="rounded-xl bg-graphite p-8 text-white">
        <h2 className="mb-6 text-center text-xl font-bold uppercase tracking-wider">
          Informações do Evento
        </h2>
        <div className="flex flex-col gap-5 sm:flex-row sm:justify-center sm:gap-12">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-6 w-6 shrink-0 text-primary-400" />
            <div>
              <p className="text-sm font-semibold text-white/70 uppercase tracking-wide">Local</p>
              <p className="font-medium">Centro Empresarial Barra Shopping</p>
              <p className="text-sm text-white/70">
                Av. das Américas, 4.200 — Bloco 9 (Barra da Tijuca, RJ)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-6 w-6 shrink-0 text-primary-400" />
            <div>
              <p className="text-sm font-semibold text-white/70 uppercase tracking-wide">Horário</p>
              <p className="font-medium">8h30 às 16h30</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
