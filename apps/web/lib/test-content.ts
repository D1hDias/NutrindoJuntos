/**
 * Test content for RichTextRenderer validation
 * Payload CMS 2.0 Slate format
 */

export const sampleRichTextContent = [
  {
    type: 'h1',
    children: [{ text: 'Guia Completo de Nutrição Esportiva' }]
  },
  {
    type: 'p',
    children: [
      { text: 'A nutrição esportiva é fundamental para atletas e praticantes de atividades físicas que buscam ' },
      { text: 'máximo desempenho', bold: true },
      { text: ' e ' },
      { text: 'recuperação eficiente', bold: true },
      { text: '.' }
    ]
  },
  {
    type: 'h2',
    children: [{ text: 'Macronutrientes Essenciais' }]
  },
  {
    type: 'p',
    children: [
      { text: 'Os macronutrientes são divididos em três categorias principais:' }
    ]
  },
  {
    type: 'ul',
    children: [
      {
        type: 'li',
        children: [
          { text: 'Proteínas', bold: true },
          { text: ' - essenciais para construção muscular (1.6-2.2g/kg)' }
        ]
      },
      {
        type: 'li',
        children: [
          { text: 'Carboidratos', bold: true },
          { text: ' - principal fonte de energia (3-10g/kg)' }
        ]
      },
      {
        type: 'li',
        children: [
          { text: 'Gorduras', bold: true },
          { text: ' - fundamentais para hormônios (0.8-1.5g/kg)' }
        ]
      }
    ]
  },
  {
    type: 'h3',
    children: [{ text: 'Timing Nutricional' }]
  },
  {
    type: 'p',
    children: [
      { text: 'O ', italic: true },
      { text: 'timing', italic: true, bold: true },
      { text: ' dos nutrientes é tão importante quanto a quantidade. Estudos mostram que a ' },
      { text: 'janela anabólica', code: true },
      { text: ' pós-treino é crucial para recuperação.' }
    ]
  },
  {
    type: 'blockquote',
    children: [
      {
        type: 'p',
        children: [
          { text: '"A nutrição adequada pode representar até 30% da performance de um atleta."' }
        ]
      }
    ]
  },
  {
    type: 'h2',
    children: [{ text: 'Hidratação e Eletrólitos' }]
  },
  {
    type: 'ol',
    children: [
      {
        type: 'li',
        children: [{ text: 'Hidratação pré-treino: 500ml 2h antes' }]
      },
      {
        type: 'li',
        children: [{ text: 'Durante o treino: 150-250ml a cada 15-20min' }]
      },
      {
        type: 'li',
        children: [{ text: 'Pós-treino: 150% do peso perdido' }]
      }
    ]
  },
  {
    type: 'code-block',
    children: [
      { text: '// Cálculo de necessidade hídrica\nconst calcularHidratacao = (peso: number, intensidade: string) => {\n  const base = peso * 35 // ml\n  const fator = intensidade === "alta" ? 1.5 : 1.2\n  return base * fator\n}' }
    ]
  },
  {
    type: 'hr'
  },
  {
    type: 'h2',
    children: [{ text: 'Suplementação Baseada em Evidências' }]
  },
  {
    type: 'p',
    children: [
      { text: 'Segundo a ' },
      {
        type: 'link',
        url: 'https://www.issn.org',
        children: [{ text: 'International Society of Sports Nutrition (ISSN)' }]
      },
      { text: ', apenas alguns suplementos possuem evidências científicas robustas:' }
    ]
  },
  {
    type: 'ul',
    children: [
      {
        type: 'li',
        children: [
          { text: 'Creatina', bold: true },
          { text: ' - 3-5g/dia (Grau A de evidência)' }
        ]
      },
      {
        type: 'li',
        children: [
          { text: 'Cafeína', bold: true },
          { text: ' - 3-6mg/kg 60min antes (Grau A)' }
        ]
      },
      {
        type: 'li',
        children: [
          { text: 'Beta-alanina', bold: true },
          { text: ' - 3-6g/dia (Grau B)' }
        ]
      }
    ]
  },
  {
    type: 'p',
    children: [
      { text: 'Importante:', bold: true, italic: true },
      { text: ' sempre consulte um nutricionista esportivo antes de iniciar qualquer suplementação.' }
    ]
  }
]

export const sampleCursoContent = [
  {
    type: 'h2',
    children: [{ text: 'O que você vai aprender' }]
  },
  {
    type: 'p',
    children: [
      { text: 'Este curso foi desenvolvido para nutricionistas e estudantes que desejam se especializar em ' },
      { text: 'nutrição esportiva baseada em evidências científicas', bold: true },
      { text: '.' }
    ]
  },
  {
    type: 'h3',
    children: [{ text: 'Módulo 1: Fundamentos' }]
  },
  {
    type: 'ul',
    children: [
      {
        type: 'li',
        children: [{ text: 'Fisiologia do exercício aplicada à nutrição' }]
      },
      {
        type: 'li',
        children: [{ text: 'Metabolismo energético durante o treino' }]
      },
      {
        type: 'li',
        children: [{ text: 'Adaptações metabólicas ao treinamento' }]
      }
    ]
  },
  {
    type: 'h3',
    children: [{ text: 'Módulo 2: Planejamento Nutricional' }]
  },
  {
    type: 'ul',
    children: [
      {
        type: 'li',
        children: [{ text: 'Periodização nutricional' }]
      },
      {
        type: 'li',
        children: [{ text: 'Estratégias de manipulação de carboidratos' }]
      },
      {
        type: 'li',
        children: [{ text: 'Protocolos de hidratação personalizados' }]
      }
    ]
  },
  {
    type: 'blockquote',
    children: [
      {
        type: 'p',
        children: [
          { text: '✅ Certificado reconhecido pelo CRN' }
        ]
      },
      {
        type: 'p',
        children: [
          { text: '✅ 40 horas de conteúdo prático' }
        ]
      },
      {
        type: 'p',
        children: [
          { text: '✅ Material de apoio exclusivo' }
        ]
      }
    ]
  },
  {
    type: 'h3',
    children: [{ text: 'Para quem é este curso?' }]
  },
  {
    type: 'p',
    children: [
      { text: 'Este curso é ideal para:' }
    ]
  },
  {
    type: 'ol',
    children: [
      {
        type: 'li',
        children: [
          { text: 'Nutricionistas', bold: true },
          { text: ' que desejam atuar com atletas' }
        ]
      },
      {
        type: 'li',
        children: [
          { text: 'Estudantes de nutrição', bold: true },
          { text: ' (últimos semestres)' }
        ]
      },
      {
        type: 'li',
        children: [
          { text: 'Profissionais da saúde', bold: true },
          { text: ' que trabalham com esportes' }
        ]
      }
    ]
  }
]

// Export tipos para TypeScript
export type RichTextContent = typeof sampleRichTextContent
