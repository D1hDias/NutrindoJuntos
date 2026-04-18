import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  BarChart3,
  CalendarDays,
  Target
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Dashboard de Métricas | NUTRINDO JUNTOS',
  description: 'Acompanhe as métricas de vendas, conversão e crescimento da plataforma',
}

interface DashboardData {
  months: string[]
  metrics: Array<{
    id: string
    month: string
    revenue: number
    orders: number
    conversion: number
    avgTicket: number
    refunds: number
    refundValue: number
    netRevenue: number
    newUsers: number
    coursesSold: Record<string, number>
    paymentMethods: Record<string, number>
  }>
  totals: {
    revenue: number
    orders: number
    refunds: number
    refundValue: number
    newUsers: number
    netRevenue: number
    avgTicket: number
    avgConversion: number
  }
  currentMonth: string
  lastUpdate: string
}

async function getDashboardData(): Promise<DashboardData> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/metrics/dashboard`, {
      next: { revalidate: 3600 } // Revalidar a cada hora
    })
    
    if (!response.ok) {
      throw new Error('Erro ao buscar dados do dashboard')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Erro ao carregar dashboard:', error)
    // Retorna dados mockados em caso de erro
    return {
      months: [],
      metrics: [],
      totals: {
        revenue: 0,
        orders: 0,
        refunds: 0,
        refundValue: 0,
        newUsers: 0,
        netRevenue: 0,
        avgTicket: 0,
        avgConversion: 0
      },
      currentMonth: new Date().toISOString().slice(0, 7),
      lastUpdate: new Date().toISOString()
    }
  }
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value / 100) // Convert from cents
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long'
  }).format(date)
}

function MetricCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  trendValue 
}: {
  title: string
  value: string | number
  description?: string
  icon: any
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && trendValue && (
          <div className="flex items-center text-xs mt-1">
            {trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500 mr-1" />}
            {trend === 'down' && <TrendingDown className="h-3 w-3 text-red-500 mr-1" />}
            <span className={trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}>
              {trendValue}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default async function MetricasPage() {
  const data = await getDashboardData()
  const currentMonthData = data.metrics.find(m => m.month === data.currentMonth)
  const lastMonthData = data.metrics[data.metrics.length - 2]

  // Calcular trends
  const revenueTrend = currentMonthData && lastMonthData 
    ? ((currentMonthData.revenue - lastMonthData.revenue) / lastMonthData.revenue * 100).toFixed(1)
    : '0'
  
  const ordersTrend = currentMonthData && lastMonthData
    ? ((currentMonthData.orders - lastMonthData.orders) / Math.max(lastMonthData.orders, 1) * 100).toFixed(1)
    : '0'

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard de Métricas</h1>
        <p className="text-muted-foreground mt-2">
          Acompanhe o desempenho financeiro e de crescimento da plataforma
        </p>
        <Badge variant="outline" className="mt-2">
          Última atualização: {new Date(data.lastUpdate).toLocaleString('pt-BR')}
        </Badge>
      </div>

      {/* Métricas Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <MetricCard
          title="Receita Total"
          value={formatCurrency(data.totals.revenue)}
          description="Últimos 12 meses"
          icon={DollarSign}
          trend={parseFloat(revenueTrend) > 0 ? 'up' : parseFloat(revenueTrend) < 0 ? 'down' : 'neutral'}
          trendValue={`${revenueTrend}% vs mês anterior`}
        />
        <MetricCard
          title="Pedidos Totais"
          value={data.totals.orders}
          description="Vendas concluídas"
          icon={ShoppingCart}
          trend={parseFloat(ordersTrend) > 0 ? 'up' : parseFloat(ordersTrend) < 0 ? 'down' : 'neutral'}
          trendValue={`${ordersTrend}% vs mês anterior`}
        />
        <MetricCard
          title="Novos Usuários"
          value={data.totals.newUsers}
          description="Últimos 12 meses"
          icon={Users}
        />
        <MetricCard
          title="Ticket Médio"
          value={formatCurrency(data.totals.avgTicket)}
          description="Valor médio por venda"
          icon={Target}
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="monthly">Mensal</TabsTrigger>
          <TabsTrigger value="courses">Cursos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Métricas Detalhadas */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Receita Líquida</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(data.totals.netRevenue)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Receita total menos reembolsos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Taxa de Conversão Média</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.totals.avgConversion.toFixed(1)}%
                </div>
                <Progress value={data.totals.avgConversion} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Reembolsos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {data.totals.refunds}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatCurrency(data.totals.refundValue)} em valor
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de Evolução */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução dos Últimos 12 Meses</CardTitle>
              <CardDescription>
                Receita e número de pedidos por mês
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.metrics.slice(-6).map((metric) => (
                  <div key={metric.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{formatDate(metric.month + '-01')}</span>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(metric.revenue)}</div>
                        <div className="text-xs text-muted-foreground">Receita</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{metric.orders}</div>
                        <div className="text-xs text-muted-foreground">Pedidos</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <div className="grid gap-6">
            {data.metrics.slice(-3).map((metric) => (
              <Card key={metric.id}>
                <CardHeader>
                  <CardTitle>{formatDate(metric.month + '-01')}</CardTitle>
                  <CardDescription>Detalhamento do mês</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <div className="text-2xl font-bold">{formatCurrency(metric.revenue)}</div>
                      <p className="text-xs text-muted-foreground">Receita Bruta</p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold">{metric.orders}</div>
                      <p className="text-xs text-muted-foreground">Pedidos</p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold">{metric.newUsers}</div>
                      <p className="text-xs text-muted-foreground">Novos Usuários</p>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 mt-4">
                    <div>
                      <p className="text-sm font-medium">Ticket Médio</p>
                      <p className="text-lg">{formatCurrency(metric.avgTicket)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Taxa de Conversão</p>
                      <p className="text-lg">{metric.conversion.toFixed(1)}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cursos Mais Vendidos</CardTitle>
              <CardDescription>Ranking baseado nos últimos 12 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Aqui seria necessário buscar dados dos cursos para exibir nomes */}
                <p className="text-muted-foreground">
                  Dados de cursos em desenvolvimento. 
                  Será necessário integrar com a collection de Cursos para exibir nomes e estatísticas detalhadas.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}