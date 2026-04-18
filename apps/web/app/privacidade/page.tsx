import { Metadata } from 'next'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de Privacidade e proteção de dados do NUTRINDO JUNTOS',
}

export default function PrivacidadePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Política de Privacidade
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
            <h2>1. Introdução</h2>
            <p>
              O NUTRINDO JUNTOS ("nós", "nosso" ou "nossa") está comprometido em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você visita nosso site e utiliza nossos serviços.
            </p>
            <p>
              Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) e outras regulamentações aplicáveis.
            </p>

            <Separator className="my-8" />

            <h2>2. Informações que Coletamos</h2>

            <h3>2.1 Informações Fornecidas por Você</h3>
            <p>Coletamos informações que você nos fornece diretamente, incluindo:</p>
            <ul>
              <li><strong>Dados de Cadastro:</strong> Nome, e-mail, telefone quando você se inscreve em nossa newsletter, cursos ou mentoria</li>
              <li><strong>Dados de Contato:</strong> Informações fornecidas através de formulários de contato</li>
              <li><strong>Dados de Pagamento:</strong> Informações necessárias para processar pagamentos de cursos (processadas por terceiros seguros)</li>
            </ul>

            <h3>2.2 Informações Coletadas Automaticamente</h3>
            <p>Quando você visita nosso site, coletamos automaticamente:</p>
            <ul>
              <li><strong>Dados de Navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas, tempo de permanência</li>
              <li><strong>Cookies:</strong> Pequenos arquivos armazenados no seu dispositivo para melhorar sua experiência</li>
              <li><strong>Analytics:</strong> Dados de uso através do Google Analytics para melhorar nossos serviços</li>
            </ul>

            <Separator className="my-8" />

            <h2>3. Como Usamos Suas Informações</h2>
            <p>Utilizamos suas informações para:</p>
            <ul>
              <li>Fornecer e melhorar nossos serviços educacionais</li>
              <li>Processar inscrições em cursos e mentorias</li>
              <li>Enviar comunicações sobre cursos, conteúdos e atualizações (com seu consentimento)</li>
              <li>Responder às suas solicitações e fornecer suporte</li>
              <li>Analisar o uso do site e melhorar a experiência do usuário</li>
              <li>Cumprir obrigações legais e regulatórias</li>
              <li>Prevenir fraudes e garantir a segurança da plataforma</li>
            </ul>

            <Separator className="my-8" />

            <h2>4. Compartilhamento de Informações</h2>
            <p>Não vendemos suas informações pessoais. Podemos compartilhar suas informações com:</p>
            <ul>
              <li><strong>Prestadores de Serviço:</strong> Parceiros que nos ajudam a operar o site (hospedagem, e-mail marketing, processamento de pagamentos)</li>
              <li><strong>Autoridades Legais:</strong> Quando exigido por lei ou para proteger nossos direitos</li>
              <li><strong>Instrutores:</strong> Informações necessárias para a prestação de serviços de mentoria</li>
            </ul>
            <p>
              Todos os parceiros são obrigados contratualmente a proteger suas informações e usá-las apenas para os fins especificados.
            </p>

            <Separator className="my-8" />

            <h2>5. Seus Direitos (LGPD)</h2>
            <p>De acordo com a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:</p>
            <ul>
              <li><strong>Acesso:</strong> Solicitar cópia dos seus dados pessoais que possuímos</li>
              <li><strong>Correção:</strong> Solicitar correção de dados incompletos, inexatos ou desatualizados</li>
              <li><strong>Exclusão:</strong> Solicitar a exclusão de seus dados pessoais</li>
              <li><strong>Portabilidade:</strong> Solicitar a transferência dos seus dados para outro fornecedor</li>
              <li><strong>Revogação de Consentimento:</strong> Retirar seu consentimento para o uso de seus dados</li>
              <li><strong>Oposição:</strong> Opor-se ao uso de seus dados para determinadas finalidades</li>
            </ul>
            <p>
              Para exercer seus direitos, entre em contato conosco através do e-mail: <a href="mailto:atendimento@nutrindojuntos.com.br">atendimento@nutrindojuntos.com.br</a>
            </p>

            <Separator className="my-8" />

            <h2>6. Cookies</h2>
            <p>Utilizamos cookies e tecnologias semelhantes para:</p>
            <ul>
              <li>Manter você conectado em sua conta</li>
              <li>Lembrar suas preferências</li>
              <li>Analisar o tráfego e uso do site</li>
              <li>Personalizar conteúdo e anúncios</li>
            </ul>
            <p>
              Você pode configurar seu navegador para recusar cookies, mas isso pode afetar a funcionalidade do site.
            </p>

            <Separator className="my-8" />

            <h2>7. Segurança</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui:
            </p>
            <ul>
              <li>Criptografia SSL/TLS para transmissão de dados</li>
              <li>Controles de acesso restrito aos dados pessoais</li>
              <li>Monitoramento regular de vulnerabilidades de segurança</li>
              <li>Treinamento de equipe em práticas de proteção de dados</li>
            </ul>

            <Separator className="my-8" />

            <h2>8. Retenção de Dados</h2>
            <p>
              Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos nesta política ou conforme exigido por lei. Quando suas informações não forem mais necessárias, serão excluídas de forma segura.
            </p>

            <Separator className="my-8" />

            <h2>9. Menores de Idade</h2>
            <p>
              Nossos serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente informações pessoais de menores. Se você acredita que coletamos informações de um menor, entre em contato conosco imediatamente.
            </p>

            <Separator className="my-8" />

            <h2>10. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre alterações significativas através do e-mail ou através de aviso em nosso site. A data da última atualização está sempre indicada no topo desta página.
            </p>

            <Separator className="my-8" />

            <h2>11. Contato</h2>
            <p>Se você tiver dúvidas sobre esta Política de Privacidade ou sobre nossas práticas de dados, entre em contato:</p>
            <ul>
              <li><strong>E-mail:</strong> <a href="mailto:atendimento@nutrindojuntos.com.br">atendimento@nutrindojuntos.com.br</a></li>
              <li><strong>Encarregado de Dados (DPO):</strong> atendimento@nutrindojuntos.com.br</li>
            </ul>

            <Separator className="my-8" />

            <div className="rounded-lg bg-green-50 p-6">
              <p className="mb-0 text-sm text-green-900">
                <strong>Nota:</strong> Ao utilizar nossos serviços, você concorda com esta Política de Privacidade. Se você não concorda com os termos aqui descritos, por favor, não utilize nossos serviços.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
