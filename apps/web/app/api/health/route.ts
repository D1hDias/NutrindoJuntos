import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Basic health checks
    const healthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100,
      },
      services: {
        api: 'healthy',
        // Add more service checks here as needed
        // database: await checkDatabase(),
        // redis: await checkRedis(),
        // brevo: await checkBrevo(),
      }
    }

    return NextResponse.json(healthCheck, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Optional: Add more detailed health checks
async function checkDatabase() {
  try {
    // Add your database connection test here
    // const result = await db.query('SELECT 1')
    return 'healthy'
  } catch {
    return 'unhealthy'
  }
}

async function checkRedis() {
  try {
    // Add your Redis connection test here
    // const result = await redis.ping()
    return 'healthy'
  } catch {
    return 'unhealthy'
  }
}

async function checkBrevo() {
  try {
    // Add Brevo API test here
    // const result = await brevoClient.getAccount()
    return 'healthy'
  } catch {
    return 'unhealthy'
  }
}