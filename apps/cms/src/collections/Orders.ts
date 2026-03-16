import { CollectionConfig } from 'payload/types'
import { updateMetrics } from '../hooks/updateMetrics'

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    singular: 'Pedido',
    plural: 'Pedidos'
  },
  admin: {
    useAsTitle: 'email',
    description: 'Gerenciamento de pedidos e pagamentos',
    defaultColumns: ['email', 'course', 'status', 'value', 'createdAt'],
    group: 'E-commerce'
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'E-mail do Cliente',
      admin: {
        description: 'E-mail do cliente que fez o pedido'
      }
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'cursos',
      required: true,
      label: 'Curso',
      admin: {
        description: 'Curso que foi comprado'
      }
    },
    {
      name: 'asaasId',
      type: 'text',
      label: 'ID Asaas',
      admin: {
        description: 'ID da cobrança no Asaas',
        readOnly: true
      }
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pendente', value: 'pending' },
        { label: 'Pago', value: 'paid' },
        { label: 'Cancelado', value: 'cancelled' },
        { label: 'Expirado', value: 'expired' }
      ],
      defaultValue: 'pending',
      required: true,
      label: 'Status do Pagamento',
      admin: {
        description: 'Status atual do pagamento'
      }
    },
    {
      name: 'accessKey',
      type: 'text',
      unique: true,
      label: 'Chave de Acesso',
      admin: {
        description: 'Chave única para acesso ao curso',
        readOnly: true
      }
    },
    {
      name: 'value',
      type: 'number',
      required: true,
      label: 'Valor (centavos)',
      admin: {
        description: 'Valor do pedido em centavos (ex: 9990 = R$ 99,90)'
      }
    },
    {
      name: 'cpf',
      type: 'text',
      label: 'CPF do Cliente',
      admin: {
        description: 'CPF informado no checkout'
      }
    },
    {
      name: 'pixQrCode',
      type: 'text',
      label: 'QR Code PIX',
      admin: {
        description: 'URL do QR Code PIX gerado pelo Asaas'
      }
    },
    {
      name: 'paidAt',
      type: 'date',
      label: 'Data do Pagamento',
      admin: {
        description: 'Data e hora em que o pagamento foi confirmado'
      }
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Observações',
      admin: {
        description: 'Observações internas sobre o pedido'
      }
    }
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Gerar accessKey apenas na criação
        if (operation === 'create' && !data.accessKey) {
          data.accessKey = Math.random().toString(36).slice(2, 10).toUpperCase()
        }
        
        // Definir paidAt quando status muda para 'paid'
        if (data.status === 'paid' && !data.paidAt) {
          data.paidAt = new Date().toISOString()
        }
        
        return data
      }
    ],
    afterChange: [updateMetrics]
  }
}