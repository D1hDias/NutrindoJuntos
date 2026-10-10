import { Rocket, TrendingUp, HeartHandshake, Megaphone, Cpu, Calculator, Mic, Gift, Infinity as InfinityIcon, Award } from 'lucide-react'

const modules = [
  {
    number: 1,
    title: 'De Nutri a CEO: Mentalidade Empreendedora',
    subtitle:
      'Desenvolva a visão estratégica necessária para transformar sua atuação profissional em um negócio estruturado e sustentável.',
    icon: Rocket,
  },
  {
    number: 2,
    title: 'Vendas e Captação: Clientes que Compram',
    subtitle:
      'Aprenda estratégias para atrair potenciais clientes, comunicar o valor do seu trabalho e transformar interesse em contratação — sem depender apenas de indicações.',
    icon: TrendingUp,
  },
  {
    number: 3,
    title: 'Experiência que Fideliza: A Jornada do Paciente',
    subtitle:
      'Entenda como criar uma experiência que começa antes da consulta e continua depois dela, aumentando satisfação, vínculo, fidelização e indicação.',
    icon: HeartHandshake,
  },
  {
    number: 4,
    title: 'Você é sua Marca: Posicionamento, Branding & Marketing',
    subtitle:
      'Construa uma marca profissional forte, comunique seus diferenciais e aprenda a ocupar seu espaço no mercado de forma estratégica.',
    icon: Megaphone,
  },
  {
    number: 5,
    title: 'Nutrição Inteligente: IA, Produtividade & Inovação',
    subtitle:
      'Descubra como utilizar inteligência artificial e novas ferramentas para otimizar processos, ganhar produtividade e inovar na sua atuação profissional.',
    icon: Cpu,
  },
  {
    number: 6,
    title: 'Negócio em Ordem: Finanças, Gestão & Segurança Jurídica',
    subtitle:
      'Precificação, organização financeira, gestão, CNPJ, contratos, impostos e os principais cuidados para construir um negócio profissional e seguro.',
    icon: Calculator,
  },
  {
    number: 7,
    title: 'Bastidores do Sucesso: Conversas com Quem Fez Acontecer',
    subtitle:
      'Aprenda também com profissionais e empreendedores que construíram negócios de sucesso e conheça os desafios, decisões e estratégias que fizeram parte dessa trajetória.',
    icon: Mic,
  },
]

const journeyBonus = {
  title: 'E você não estará sozinho nessa jornada',
  subtitle: 'Ao entrar para o Nutri CEO, você terá:',
  items: [
    '1 ano de acesso à formação',
    'Grupo exclusivo no WhatsApp, para networking, trocas e compartilhamento de materiais',
    'Encontros mensais ao vivo para dúvidas e mentoria em grupo',
    'Aulas com especialistas e profissionais convidados de diferentes áreas do empreendedorismo',
  ],
}

export function NutriCEOContent() {
  return (
    <div className="space-y-16">

      {/* O que é o Nutri CEO */}
      <div className="space-y-4">
        <p className="text-lg leading-relaxed text-neutral-600">
          Ser um excelente nutricionista é o começo. Mas construir uma carreira sustentável,
          atrair pacientes, vender seus serviços, organizar as finanças e se posicionar no mercado
          exige habilidades que nem sempre são ensinadas na graduação.
        </p>
        <p className="text-lg leading-relaxed text-neutral-600">
          O Nutri CEO é uma iniciativa da Nutrindo Juntos em parceria com a faculdade VP. Ele foi
          criado justamente para nutricionistas que estão começando a empreender e querem construir
          seu negócio com mais estratégia, segurança e profissionalismo.
        </p>
        <p className="text-lg font-medium text-graphite">
          Durante o curso, você aprenderá a pensar não apenas como nutricionista, mas também como
          gestor da própria carreira.
        </p>
      </div>

      {/* Módulos */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-graphite">O que você vai aprender</h2>

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
                  </div>
                </div>
              </div>
            )
          })}

          {/* Jornada / Bônus de acesso */}
          <div className="overflow-hidden rounded-xl border-2 border-dashed border-amber-300 bg-amber-50 shadow-sm">
            <div className="flex items-start gap-4 p-6">
              <div className="flex flex-shrink-0 flex-col items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
                  <Gift className="h-5 w-5" />
                </span>
              </div>

              <div className="flex-1 space-y-3">
                <h3 className="text-lg font-bold text-graphite">{journeyBonus.title}</h3>
                <p className="text-sm font-medium text-amber-800">{journeyBonus.subtitle}</p>

                <ul className="space-y-1.5">
                  {journeyBonus.items.map((item) => (
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

      {/* Fechamento */}
      <div className="rounded-xl bg-graphite p-8 text-white">
        <p className="mb-2 text-center text-lg leading-relaxed text-neutral-300">
          Você já aprendeu a ser nutricionista. Agora é hora de aprender a construir o negócio por
          trás da sua profissão.
        </p>
        <h2 className="mb-8 text-center text-xl font-bold">
          Nutri CEO — conhecimento para atender.
          <br />
          Estratégia para crescer.
        </h2>
        <div className="flex flex-col items-center gap-4 border-t border-white/15 pt-6 sm:flex-row sm:justify-center sm:gap-12">
          <div className="flex items-center gap-3">
            <InfinityIcon className="h-6 w-6 text-primary-400" />
            <span className="text-lg font-semibold">1 ano de acesso</span>
          </div>
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-primary-400" />
            <span className="text-lg font-semibold">Certificado de conclusão</span>
          </div>
        </div>
      </div>
    </div>
  )
}
