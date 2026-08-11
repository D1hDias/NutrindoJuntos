import Image from 'next/image'
import { Tag, Check } from 'lucide-react'

const RH_URL = 'https://mlp.rhmaisexperts.com.br/nutrindojuntos'

const SERVICES = [
  'Elaboração e otimização de currículo',
  'Direcionamento profissional',
  'Posicionamento no LinkedIn',
  'Preparação para processos seletivos',
  'Busca e aplicação estratégica em vagas',
]

export function RHPartnership() {
  return (
    <div className="overflow-hidden rounded-xl border border-primary-100 bg-gradient-to-b from-primary-50/60 to-white shadow-sm">
      <div className="space-y-5 p-6">
        {/* Cabeçalho */}
        <div className="space-y-3">
          <Image
            src="/images/parceiros/rh-experts.png"
            alt="RH+ Experts"
            width={444}
            height={358}
            className="h-16 w-auto"
          />

          <span className="inline-block rounded-full border border-primary-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-700">
            Parceria exclusiva
          </span>

          <h3 className="text-lg font-bold leading-snug text-primary-800">
            Da formação ao mercado: a parceria que impulsiona sua carreira!
          </h3>

          <p className="text-sm leading-relaxed text-neutral-600">
            A Nutrindo Juntos tem parceria exclusiva com a RH+ Experts para ajudar você a
            transformar conhecimento em oportunidades.
          </p>
        </div>

        {/* Serviços */}
        <ul className="space-y-2 border-t border-primary-100 pt-4">
          {SERVICES.map((service) => (
            <li key={service} className="flex items-start gap-2 text-sm text-neutral-700">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-500" />
              {service}
            </li>
          ))}
        </ul>

        {/* Condições especiais */}
        <div className="flex items-start gap-3 rounded-lg border border-primary-100 bg-white p-3">
          <Tag className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-500" />
          <p className="text-sm leading-snug text-primary-700">
            Condições especiais para{' '}
            <span className="font-bold">alunos da Nutrindo Juntos!</span>
          </p>
        </div>

        <p className="text-xs leading-snug text-neutral-500">
          Serviços contratados diretamente com a RH+ e pagos separadamente do curso.
        </p>

        {/* CTA */}
        <a
          href={RH_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-3 text-center text-sm font-bold uppercase leading-tight tracking-wide text-white transition-colors hover:bg-primary-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 flex-shrink-0"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
          </svg>
          Conhecer serviços da parceria com a RH+
        </a>

        <p className="text-center text-[11px] text-neutral-500">
          Você será direcionado ao WhatsApp da RH+.
        </p>
      </div>
    </div>
  )
}
