import { Metadata } from 'next'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos e Condições de Uso do NUTRINDO JUNTOS',
}

export default function TermosPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Termos de Uso
            </h1>
            <p className="text-lg text-gray-600">
              Última atualização: {new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg mx-auto max-w-4xl">
            <h2>1. Aceitação dos Termos</h2>
            <p>
              Bem-vindo ao NUTRINDO JUNTOS. Ao acessar e usar nosso site e serviços, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concorda com qualquer parte destes termos, não deve usar nossos serviços.
            </p>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações significativas serão comunicadas através do site ou por e-mail.
            </p>

            <Separator className="my-8" />

            <h2>2. Descrição dos Serviços</h2>
            <p>O NUTRINDO JUNTOS oferece:</p>
            <ul>
              <li><strong>Cursos Online:</strong> Conteúdo educacional em nutrição através de vídeo-aulas, materiais complementares e certificados</li>
              <li><strong>Mentoria Personalizada:</strong> Acompanhamento individualizado com profissionais especializados</li>
              <li><strong>Blog:</strong> Artigos e conteúdos gratuitos sobre nutrição</li>
              <li><strong>Newsletter:</strong> Comunicações periódicas com novidades e conteúdos exclusivos</li>
            </ul>

            <Separator className="my-8" />

            <h2>3. Cadastro e Conta de Usuário</h2>

            <h3>3.1 Criação de Conta</h3>
            <p>Para acessar determinados serviços, você precisará criar uma conta fornecendo informações precisas e completas.</p>

            <h3>3.2 Responsabilidades do Usuário</h3>
            <p>Você é responsável por:</p>
            <ul>
              <li>Manter a confidencialidade de sua senha e conta</li>
              <li>Todas as atividades que ocorrem em sua conta</li>
              <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
              <li>Garantir que suas informações de cadastro estejam sempre atualizadas</li>
            </ul>

            <h3>3.3 Suspensão de Conta</h3>
            <p>
              Reservamo-nos o direito de suspender ou encerrar sua conta se houver violação destes termos ou atividade suspeita.
            </p>

            <Separator className="my-8" />

            <h2>4. Uso Aceitável</h2>

            <h3>4.1 Você Concorda em NÃO:</h3>
            <ul>
              <li>Usar os serviços para qualquer propósito ilegal ou não autorizado</li>
              <li>Violar direitos de propriedade intelectual</li>
              <li>Compartilhar seu acesso aos cursos com terceiros não autorizados</li>
              <li>Fazer download, copiar ou distribuir conteúdo sem autorização</li>
              <li>Interferir ou perturbar os serviços ou servidores</li>
              <li>Coletar informações de outros usuários sem consentimento</li>
              <li>Usar nossos serviços para transmitir spam, malware ou conteúdo malicioso</li>
              <li>Personificar outra pessoa ou entidade</li>
            </ul>

            <Separator className="my-8" />

            <h2>5. Propriedade Intelectual</h2>

            <h3>5.1 Direitos Autorais</h3>
            <p>
              Todo o conteúdo disponibilizado no NUTRINDO JUNTOS, incluindo mas não limitado a textos, vídeos, imagens, logos, gráficos e software, é protegido por direitos autorais e outras leis de propriedade intelectual.
            </p>

            <h3>5.2 Licença de Uso</h3>
            <p>
              Concedemos a você uma licença limitada, não exclusiva, intransferível e revogável para acessar e usar nosso conteúdo exclusivamente para fins pessoais e educacionais.
            </p>

            <h3>5.3 Restrições</h3>
            <p>Você NÃO pode:</p>
            <ul>
              <li>Reproduzir, distribuir ou modificar nosso conteúdo sem autorização prévia por escrito</li>
              <li>Criar trabalhos derivados baseados em nosso conteúdo</li>
              <li>Usar nosso conteúdo para fins comerciais sem permissão</li>
              <li>Remover ou alterar avisos de direitos autorais</li>
            </ul>

            <Separator className="my-8" />

            <h2>6. Pagamentos e Reembolsos</h2>

            <h3>6.1 Preços e Pagamento</h3>
            <p>
              Os preços de nossos cursos e serviços estão sujeitos a alterações sem aviso prévio. O pagamento deve ser realizado através dos métodos especificados no momento da compra.
            </p>

            <h3>6.2 Política de Reembolso</h3>
            <p>
              Oferecemos garantia de reembolso de 7 dias para cursos, desde que menos de 20% do conteúdo tenha sido acessado. Após esse período ou percentual, as vendas são consideradas finais.
            </p>

            <h3>6.3 Cancelamento</h3>
            <p>
              Você pode cancelar sua participação em mentorias com aviso prévio de 48 horas. Valores pagos serão calculados proporcionalmente aos serviços já prestados.
            </p>

            <Separator className="my-8" />

            <h2>7. Certificados</h2>
            <p>
              Certificados de conclusão são emitidos após a finalização bem-sucedida dos cursos, incluindo:
            </p>
            <ul>
              <li>Conclusão de todas as aulas obrigatórias</li>
              <li>Aprovação em avaliações (quando aplicável)</li>
              <li>Pagamento integral do curso</li>
            </ul>
            <p>
              Os certificados são emitidos digitalmente e podem ser verificados através de código de autenticação.
            </p>

            <Separator className="my-8" />

            <h2>8. Limitação de Responsabilidade</h2>

            <h3>8.1 Isenção de Garantias</h3>
            <p>
              Os serviços são fornecidos "como estão" sem garantias de qualquer tipo, expressas ou implícitas. Não garantimos que:
            </p>
            <ul>
              <li>Os serviços atenderão suas necessidades específicas</li>
              <li>Os serviços estarão disponíveis ininterruptamente ou livres de erros</li>
              <li>Os resultados obtidos através dos serviços serão precisos ou confiáveis</li>
            </ul>

            <h3>8.2 Limitação de Responsabilidade</h3>
            <p>
              Em nenhuma circunstância seremos responsáveis por danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo mas não limitado a perda de lucros, dados ou outras perdas intangíveis.
            </p>

            <Separator className="my-8" />

            <h2>9. Indenização</h2>
            <p>
              Você concorda em indenizar e isentar o NUTRINDO JUNTOS, seus diretores, funcionários e parceiros de quaisquer reclamações, danos, obrigações, perdas, responsabilidades, custos ou dívidas decorrentes de:
            </p>
            <ul>
              <li>Seu uso dos serviços</li>
              <li>Violação destes Termos de Uso</li>
              <li>Violação de direitos de terceiros</li>
            </ul>

            <Separator className="my-8" />

            <h2>10. Links para Sites de Terceiros</h2>
            <p>
              Nosso site pode conter links para sites de terceiros. Não somos responsáveis pelo conteúdo, políticas de privacidade ou práticas desses sites. Recomendamos que você leia os termos e políticas de qualquer site de terceiros que visitar.
            </p>

            <Separator className="my-8" />

            <h2>11. Privacidade</h2>
            <p>
              Seu uso dos serviços também é regido por nossa <Link href="/privacidade" className="text-green-600 hover:text-green-700">Política de Privacidade</Link>. Por favor, revise-a para entender nossas práticas de coleta e uso de dados.
            </p>

            <Separator className="my-8" />

            <h2>12. Modificações dos Serviços</h2>
            <p>
              Reservamo-nos o direito de modificar ou descontinuar, temporária ou permanentemente, os serviços (ou qualquer parte deles) com ou sem aviso prévio. Não seremos responsáveis por qualquer modificação, suspensão ou descontinuação dos serviços.
            </p>

            <Separator className="my-8" />

            <h2>13. Lei Aplicável e Jurisdição</h2>
            <p>
              Estes Termos de Uso serão regidos e interpretados de acordo com as leis do Brasil. Qualquer disputa relacionada a estes termos será submetida à jurisdição exclusiva dos tribunais brasileiros.
            </p>

            <Separator className="my-8" />

            <h2>14. Disposições Gerais</h2>

            <h3>14.1 Acordo Completo</h3>
            <p>
              Estes Termos de Uso constituem o acordo completo entre você e o NUTRINDO JUNTOS em relação ao uso dos serviços.
            </p>

            <h3>14.2 Separabilidade</h3>
            <p>
              Se qualquer disposição destes termos for considerada inválida ou inexequível, as demais disposições permanecerão em pleno vigor e efeito.
            </p>

            <h3>14.3 Renúncia</h3>
            <p>
              A falha em exercer ou fazer cumprir qualquer direito ou disposição destes termos não constituirá uma renúncia a tal direito ou disposição.
            </p>

            <Separator className="my-8" />

            <h2>15. Contato</h2>
            <p>Se você tiver dúvidas sobre estes Termos de Uso, entre em contato:</p>
            <ul>
              <li><strong>E-mail:</strong> <a href="mailto:atendimento@nutrindojuntos.com.br">atendimento@nutrindojuntos.com.br</a></li>
            </ul>

            <Separator className="my-8" />

            <div className="rounded-lg bg-green-50 p-6">
              <p className="mb-0 text-sm text-green-900">
                <strong>Declaração de Consentimento:</strong> Ao usar nossos serviços, você reconhece que leu, entendeu e concorda em estar vinculado a estes Termos de Uso e à nossa Política de Privacidade.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
