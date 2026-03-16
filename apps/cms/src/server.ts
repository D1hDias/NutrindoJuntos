import express from 'express'
import payload from 'payload'
import { config } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import createAsaasWebhook from './webhooks/asaas'

config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Serve static files from public directory
app.use(express.static(path.resolve(__dirname, '../public')))

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

// Health check endpoint
app.get('/api/health', (_, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
  })
})

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET!,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Setup webhooks after Payload initialization
  // Parse raw JSON for webhook verification
  app.use('/webhooks/asaas', express.raw({ type: 'application/json' }))
  app.use('/webhooks/asaas', (req, res, next) => {
    // Convert raw buffer back to JSON for processing
    if (Buffer.isBuffer(req.body)) {
      try {
        req.body = JSON.parse(req.body.toString())
      } catch (error) {
        payload.logger.error('Error parsing webhook JSON:', error)
        return res.status(400).json({ error: 'Invalid JSON' })
      }
    }
    next()
  })
  
  // Asaas webhook endpoint
  app.post('/webhooks/asaas', createAsaasWebhook(payload))
  
  payload.logger.info('✅ Webhook endpoints configured')

  // Start Express server
  app.listen(PORT, async () => {
    payload.logger.info(`Server listening on port ${PORT}`)
  })
}

start()
