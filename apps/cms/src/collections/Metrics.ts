import { CollectionConfig } from 'payload/types'

export const Metrics: CollectionConfig = {
  slug: 'metrics',
  labels: {
    singular: 'Métrica',
    plural: 'Métricas'
  },
  admin: {
    useAsTitle: 'month',
    description: 'Métricas financeiras e de conversão automatizadas',
    defaultColumns: ['month', 'revenue', 'orders', 'conversion', 'avgTicket'],
    group: 'Dashboard',
    pagination: {
      defaultLimit: 12
    }
  },
  access: {
    // Apenas leitura - dados são atualizados via hooks
    read: () => true,
    create: ({ req }) => {
      // Permitir criação apenas via API interna ou admin
      return req.user?.role === 'admin' || false
    },
    update: ({ req }) => {
      return req.user?.role === 'admin' || false
    },
    delete: ({ req }) => {
      return req.user?.role === 'admin' || false
    }
  },
  fields: [
    {
      name: 'month',
      type: 'text',
      required: true,
      unique: true,
      label: 'Mês/Ano',
      admin: {
        description: 'Formato: YYYY-MM (ex: 2025-01)',
        readOnly: true
      }
    },
    {
      name: 'revenue',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Receita Total (centavos)',
      admin: {
        description: 'Receita total do mês em centavos'
      }
    },
    {
      name: 'orders',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Total de Pedidos',
      admin: {
        description: 'Número total de pedidos pagos no mês'
      }
    },
    {
      name: 'conversion',
      type: 'number',
      defaultValue: 0,
      label: 'Taxa de Conversão (%)',
      admin: {
        description: 'Taxa de conversão de visitantes para compradores'
      }
    },
    {
      name: 'avgTicket',
      type: 'number',
      defaultValue: 0,
      label: 'Ticket Médio (centavos)',
      admin: {
        description: 'Valor médio por pedido em centavos'
      }
    },
    {
      name: 'refunds',
      type: 'number',
      defaultValue: 0,
      label: 'Reembolsos',
      admin: {
        description: 'Número de reembolsos no mês'
      }
    },
    {
      name: 'refundValue',
      type: 'number',
      defaultValue: 0,
      label: 'Valor Reembolsado (centavos)',
      admin: {
        description: 'Valor total reembolsado no mês'
      }
    },
    {
      name: 'netRevenue',
      type: 'number',
      defaultValue: 0,
      label: 'Receita Líquida (centavos)',
      admin: {
        description: 'Receita total menos reembolsos'
      }
    },
    {
      name: 'newUsers',
      type: 'number',
      defaultValue: 0,
      label: 'Novos Usuários',
      admin: {
        description: 'Número de novos usuários cadastrados no mês'
      }
    },
    {
      name: 'coursesSold',
      type: 'json',
      label: 'Cursos Vendidos',
      admin: {
        description: 'Detalhamento de vendas por curso (JSON com ID e quantidade)'
      }
    },
    {
      name: 'paymentMethods',
      type: 'json',
      label: 'Métodos de Pagamento',
      admin: {
        description: 'Distribuição por método de pagamento (PIX, boleto, etc.)'
      }
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Resumo do Mês',
      admin: {
        description: 'Resumo opcional das principais métricas e eventos do mês'
      }
    }
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Calcular receita líquida automaticamente
        if (data.revenue && data.refundValue) {
          data.netRevenue = data.revenue - data.refundValue
        }
        
        // Calcular ticket médio automaticamente
        if (data.revenue && data.orders && data.orders > 0) {
          data.avgTicket = Math.round(data.revenue / data.orders)
        }
        
        return data
      }
    ]
  },
  endpoints: [
    {
      path: '/dashboard',
      method: 'get',
      handler: async (req, res) => {
        try {
          // Buscar métricas dos últimos 12 meses
          const currentDate = new Date()
          const months = []
          
          for (let i = 11; i >= 0; i--) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
            const month = date.toISOString().slice(0, 7) // YYYY-MM
            months.push(month)
          }
          
          const metrics = await req.payload.find({
            collection: 'metrics',
            where: {
              month: {
                in: months
              }
            },
            sort: 'month',
            limit: 12
          })
          
          // Calcular totais
          const totals = metrics.docs.reduce((acc, metric) => ({
            revenue: acc.revenue + (metric.revenue || 0),
            orders: acc.orders + (metric.orders || 0),
            refunds: acc.refunds + (metric.refunds || 0),
            refundValue: acc.refundValue + (metric.refundValue || 0),
            newUsers: acc.newUsers + (metric.newUsers || 0)
          }), {
            revenue: 0,
            orders: 0,
            refunds: 0,
            refundValue: 0,
            newUsers: 0
          })
          
          const avgConversion = metrics.docs.length > 0 
            ? Math.round(metrics.docs.reduce((acc, m) => acc + (m.conversion || 0), 0) / metrics.docs.length)
            : 0
          
          const dashboard = {
            months: months,
            metrics: metrics.docs,
            totals: {
              ...totals,
              netRevenue: totals.revenue - totals.refundValue,
              avgTicket: totals.orders > 0 ? Math.round(totals.revenue / totals.orders) : 0,
              avgConversion: avgConversion
            },
            currentMonth: currentDate.toISOString().slice(0, 7),
            lastUpdate: new Date().toISOString()
          }
          
          res.json(dashboard)
        } catch (error) {
          res.status(500).json({ 
            error: 'Erro ao buscar métricas do dashboard',
            message: error instanceof Error ? error.message : 'Erro desconhecido'
          })
        }
      }
    }
  ]
}