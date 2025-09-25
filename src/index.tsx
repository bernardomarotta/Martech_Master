import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

// Import routes
import authRoutes from './routes/auth'
import profileRoutes from './routes/profile'
import membersRoutes from './routes/members'
import paymentsRoutes from './routes/payments'

// Import pages
import landingPage from './pages/landing'
import loginPage from './pages/login'
import portalPage from './pages/portal'
import profilePage from './pages/profile'
import membersPage from './pages/members'
import paymentsPage from './pages/payments'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// API Routes
app.route('/api/auth', authRoutes)
app.route('/api/profile', profileRoutes)
app.route('/api/members', membersRoutes)
app.route('/api/payments', paymentsRoutes)

// Page Routes
app.get('/', landingPage)
app.get('/login', loginPage)
app.get('/portal', portalPage)
app.get('/profile', profilePage)
app.get('/members', membersPage)
app.get('/payments', paymentsPage)

// Health check
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app