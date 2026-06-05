import { Check, HeartHandshake } from 'lucide-react'

const benefits = [
  'Aulas ao vivo semanais com temas atuais da Nutrição',
  'Discussão de artigos científicos e atualizações das principais diretrizes',
  'Materiais de apoio e resumos práticos',
  'Sugestões de livros e conteúdos complementares',
  'Certificados de participação',
  'Comunidade exclusiva para networking e aprendizado',
  'Conteúdos organizados por temas e áreas de atuação',
  'Educação continuada para quem deseja evoluir constantemente',
]

export function NutrindoMentesContent() {
  return (
    <div className="space-y-12">
      {/* Intro */}
      <div className="space-y-4">
        <p className="text-lg leading-relaxed text-neutral-600">
          A Nutrição evolui todos os dias. Novos artigos são publicados, novas diretrizes são
          lançadas e novas estratégias surgem constantemente. Porém, acompanhar tudo isso nem
          sempre é simples.
        </p>
        <p className="leading-relaxed text-neutral-600">
          Muitos profissionais enfrentam uma realidade comum: plataformas científicas
          internacionais possuem assinaturas em dólar, cursos de atualização podem ter custos
          elevados e, muitas vezes, é preciso escolher apenas um congresso ou evento por ano para
          conseguir se manter atualizado.
        </p>
        <p className="leading-relaxed text-neutral-600">
          Foi pensando nisso que nasceu a <strong>Nutrindo Mentes</strong>: uma comunidade criada
          para tornar a atualização profissional mais acessível, prática e contínua, permitindo que
          estudantes e nutricionistas tenham contato frequente com conteúdos relevantes sem precisar
          investir milhares de reais em eventos, viagens ou assinaturas internacionais.
        </p>
        <div className="rounded-xl border-l-4 border-primary-500 bg-primary-50 p-5">
          <p className="font-semibold text-primary-900">
            Aqui, acreditamos que o conhecimento não deve ser um privilégio, mas uma ferramenta
            acessível para transformar carreiras e vidas.
          </p>
        </div>
      </div>

      {/* O que você encontrará */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-graphite">
          O que você encontrará na comunidade?
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {benefits.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
            >
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" />
              <span className="text-sm font-medium text-neutral-700">{item}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl border-l-4 border-primary-500 bg-primary-50 p-5">
          <p className="font-medium text-primary-900">
            Cada mês contará com uma temática principal, permitindo aprofundamento em diferentes
            áreas da Nutrição ao longo do ano.
          </p>
        </div>
      </div>

      {/* Impacto social */}
      <div className="rounded-xl bg-graphite p-8 text-white">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-500/20">
            <HeartHandshake className="h-5 w-5 text-primary-400" />
          </div>
          <h2 className="text-xl font-bold uppercase tracking-wider">
            Conhecimento que gera impacto social
          </h2>
        </div>
        <div className="space-y-4 text-white/80">
          <p className="leading-relaxed">
            A Nutrindo Mentes também nasceu com um propósito maior. Durante sua vigência,{' '}
            <strong className="text-white">
              50% do valor arrecadado será destinado a ações sociais
            </strong>{' '}
            voltadas para famílias em situação de vulnerabilidade alimentar.
          </p>
          <p className="leading-relaxed">
            Assim, ao investir na sua formação, você também contribui para que outras famílias
            tenham acesso ao básico: alimento na mesa. Porque acreditamos que a Nutrição tem o poder
            de transformar vidas em todas as suas dimensões.
          </p>
        </div>
      </div>

      {/* Fechamento */}
      <div className="space-y-4 text-center">
        <p className="text-lg font-semibold text-primary-600">
          Aprenda mais. Evolua constantemente. Compartilhe conhecimento. Transforme vidas.
        </p>
        <div>
          <p className="font-display text-2xl font-bold text-graphite">Nutrindo Mentes</p>
          <p className="text-sm text-neutral-500">
            Conhecimento que alimenta carreiras. Solidariedade que alimenta famílias.
          </p>
        </div>
      </div>
    </div>
  )
}
