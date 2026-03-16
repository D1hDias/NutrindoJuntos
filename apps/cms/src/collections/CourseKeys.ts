import { CollectionConfig } from 'payload/types'

export const CourseKeys: CollectionConfig = {
  slug: 'course-keys',
  labels: {
    singular: 'Chave de Curso',
    plural: 'Chaves de Cursos'
  },
  admin: {
    useAsTitle: 'id',
    description: 'Controle de acesso aos cursos pelos usuários',
    defaultColumns: ['user', 'course', 'expiresAt', 'createdAt'],
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
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Usuário',
      admin: {
        description: 'Usuário que tem acesso ao curso'
      }
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'cursos',
      required: true,
      label: 'Curso',
      admin: {
        description: 'Curso ao qual o usuário tem acesso'
      }
    },
    {
      name: 'order',
      type: 'relationship',
      relationTo: 'orders',
      label: 'Pedido',
      admin: {
        description: 'Pedido que originou este acesso'
      }
    },
    {
      name: 'expiresAt',
      type: 'date',
      label: 'Data de Expiração',
      admin: {
        description: 'Data em que o acesso expira (deixe vazio para acesso permanente)',
        date: {
          pickerAppearance: 'dayAndTime'
        }
      }
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Ativo',
      admin: {
        description: 'Se o acesso está ativo ou foi suspenso'
      }
    },
    {
      name: 'accessCount',
      type: 'number',
      defaultValue: 0,
      label: 'Contagem de Acessos',
      admin: {
        description: 'Número de vezes que o usuário acessou o curso'
      }
    },
    {
      name: 'lastAccessAt',
      type: 'date',
      label: 'Último Acesso',
      admin: {
        description: 'Data do último acesso ao curso'
      }
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Observações',
      admin: {
        description: 'Observações sobre este acesso'
      }
    }
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Se não definiu expiração, define para 1 ano a partir de agora
        if (operation === 'create' && !data.expiresAt) {
          const oneYear = new Date()
          oneYear.setFullYear(oneYear.getFullYear() + 1)
          data.expiresAt = oneYear.toISOString()
        }
        
        return data
      }
    ]
  },
  endpoints: [
    {
      path: '/check-access/:userId/:courseId',
      method: 'get',
      handler: async (req, res) => {
        const { userId, courseId } = req.params
        
        try {
          const access = await req.payload.find({
            collection: 'course-keys',
            where: {
              and: [
                { user: { equals: userId } },
                { course: { equals: courseId } },
                { isActive: { equals: true } },
                {
                  or: [
                    { expiresAt: { greater_than: new Date().toISOString() } },
                    { expiresAt: { exists: false } }
                  ]
                }
              ]
            }
          })
          
          const hasAccess = access.docs.length > 0
          
          if (hasAccess) {
            // Atualizar contagem e último acesso
            const key = access.docs[0]
            await req.payload.update({
              collection: 'course-keys',
              id: key.id,
              data: {
                accessCount: (key.accessCount || 0) + 1,
                lastAccessAt: new Date().toISOString()
              }
            })
          }
          
          res.json({ hasAccess, access: hasAccess ? access.docs[0] : null })
        } catch (error) {
          res.status(500).json({ error: 'Erro ao verificar acesso' })
        }
      }
    }
  ]
}