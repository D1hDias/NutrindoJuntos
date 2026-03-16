import { CollectionAfterChangeHook } from 'payload/types'

export const updateMetrics: CollectionAfterChangeHook = async ({
  doc, // documento que foi alterado
  req, // request object com payload instance
  previousDoc, // documento antes da alteração
  operation // 'create' ou 'update'
}) => {
  try {
    // Só processa se for um pedido (order)
    if (!doc || typeof doc !== 'object') return

    const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM format
    
    // Buscar ou criar métrica do mês atual
    let metric
    const existingMetrics = await req.payload.find({
      collection: 'metrics',
      where: {
        month: {
          equals: currentMonth
        }
      },
      limit: 1
    })

    if (existingMetrics.docs && existingMetrics.docs.length > 0) {
      metric = existingMetrics.docs[0]
    } else {
      // Criar nova métrica para o mês
      metric = await req.payload.create({
        collection: 'metrics',
        data: {
          month: currentMonth,
          revenue: 0,
          orders: 0,
          conversion: 0,
          avgTicket: 0,
          refunds: 0,
          refundValue: 0,
          netRevenue: 0,
          newUsers: 0,
          coursesSold: {},
          paymentMethods: {}
        }
      })
    }

    // Calcular incrementos baseados no status do pedido
    let revenueIncrement = 0
    let orderIncrement = 0
    let refundIncrement = 0
    let refundValueIncrement = 0

    // Lógica para novos pedidos (create)
    if (operation === 'create') {
      if (doc.status === 'paid') {
        revenueIncrement = doc.value || 0
        orderIncrement = 1
      }
    }
    
    // Lógica para pedidos atualizados (update)
    else if (operation === 'update' && previousDoc) {
      // Pedido mudou de pending para paid
      if (previousDoc.status !== 'paid' && doc.status === 'paid') {
        revenueIncrement = doc.value || 0
        orderIncrement = 1
      }
      
      // Pedido foi reembolsado
      else if (previousDoc.status === 'paid' && doc.status === 'refunded') {
        revenueIncrement = -(doc.value || 0) // Remove da receita
        orderIncrement = -1 // Remove do contador de pedidos
        refundIncrement = 1
        refundValueIncrement = doc.value || 0
      }
      
      // Pedido voltou de reembolsado para pago (raro, mas possível)
      else if (previousDoc.status === 'refunded' && doc.status === 'paid') {
        revenueIncrement = doc.value || 0
        orderIncrement = 1
        refundIncrement = -1
        refundValueIncrement = -(doc.value || 0)
      }
    }

    // Atualizar métricas apenas se houve mudança
    if (revenueIncrement !== 0 || orderIncrement !== 0 || refundIncrement !== 0) {
      const newRevenue = (metric.revenue || 0) + revenueIncrement
      const newOrders = Math.max(0, (metric.orders || 0) + orderIncrement)
      const newRefunds = Math.max(0, (metric.refunds || 0) + refundIncrement)
      const newRefundValue = Math.max(0, (metric.refundValue || 0) + refundValueIncrement)
      
      // Calcular ticket médio
      const newAvgTicket = newOrders > 0 ? Math.round(newRevenue / newOrders) : 0
      
      // Calcular receita líquida
      const newNetRevenue = newRevenue - newRefundValue

      // Atualizar cursos vendidos (JSON)
      let coursesSold = metric.coursesSold || {}
      if (doc.course && orderIncrement > 0) {
        const courseId = typeof doc.course === 'object' ? doc.course.id : doc.course
        coursesSold[courseId] = (coursesSold[courseId] || 0) + orderIncrement
      }

      // Atualizar métodos de pagamento (PIX por enquanto)
      let paymentMethods = metric.paymentMethods || {}
      if (orderIncrement > 0) {
        paymentMethods['PIX'] = (paymentMethods['PIX'] || 0) + 1
      }

      await req.payload.update({
        collection: 'metrics',
        id: metric.id,
        data: {
          revenue: Math.max(0, newRevenue),
          orders: newOrders,
          refunds: newRefunds,
          refundValue: newRefundValue,
          netRevenue: Math.max(0, newNetRevenue),
          avgTicket: newAvgTicket,
          coursesSold,
          paymentMethods
        }
      })

      // Log da atualização
      req.payload.logger.info(`Métricas atualizadas para ${currentMonth}:`, {
        revenueIncrement,
        orderIncrement,
        refundIncrement,
        newRevenue: Math.max(0, newRevenue),
        newOrders,
        newAvgTicket
      })
    }

  } catch (error) {
    // Log do erro, mas não impede a operação principal
    req.payload.logger.error('Erro ao atualizar métricas:', error)
  }
}

// Hook específico para criação de novos usuários
export const updateUserMetrics: CollectionAfterChangeHook = async ({
  doc,
  req,
  operation
}) => {
  try {
    // Só processa criação de novos usuários que não sejam admin
    if (operation !== 'create' || !doc || doc.role === 'admin') return

    const currentMonth = new Date().toISOString().slice(0, 7)
    
    // Buscar métrica do mês atual
    const existingMetrics = await req.payload.find({
      collection: 'metrics',
      where: { month: { equals: currentMonth } },
      limit: 1
    })

    let metric
    if (existingMetrics.docs && existingMetrics.docs.length > 0) {
      metric = existingMetrics.docs[0]
      
      // Incrementar contador de novos usuários
      await req.payload.update({
        collection: 'metrics',
        id: metric.id,
        data: {
          newUsers: (metric.newUsers || 0) + 1
        }
      })
    } else {
      // Criar nova métrica com 1 usuário
      await req.payload.create({
        collection: 'metrics',
        data: {
          month: currentMonth,
          revenue: 0,
          orders: 0,
          refunds: 0,
          refundValue: 0,
          netRevenue: 0,
          avgTicket: 0,
          conversion: 0,
          newUsers: 1,
          coursesSold: {},
          paymentMethods: {}
        }
      })
    }

    req.payload.logger.info(`Novo usuário adicionado às métricas de ${currentMonth}`)

  } catch (error) {
    req.payload.logger.error('Erro ao atualizar métricas de usuário:', error)
  }
}