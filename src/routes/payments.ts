import { Hono } from 'hono'
import { verify } from 'hono/jwt'

type Bindings = {
  DB: D1Database
}

const payments = new Hono<{ Bindings: Bindings }>()

// Middleware to verify authentication
async function requireAuth(c: any, next: any) {
  const authHeader = c.req.header('Authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Não autorizado' }, 401)
  }

  const token = authHeader.split(' ')[1]
  
  try {
    const payload = await verify(token, 'martech-master-secret-key-2024')
    c.set('user', payload)
    await next()
  } catch {
    return c.json({ error: 'Token inválido' }, 401)
  }
}

// Get payment history
payments.get('/history', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    
    const history = await c.env.DB.prepare(`
      SELECT 
        id,
        user_id,
        amount,
        currency,
        status,
        payment_method,
        description,
        created_at
      FROM payments
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 50
    `).bind(user.id).all()

    return c.json({
      success: true,
      payments: history.results || []
    })
  } catch (error) {
    console.error('Get payment history error:', error)
    return c.json({ error: 'Erro ao buscar histórico de pagamentos' }, 500)
  }
})

// Get all payments (admin only)
payments.get('/all', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    
    // Check if user is admin
    if (user.role !== 'admin') {
      return c.json({ error: 'Permissão negada' }, 403)
    }

    const allPayments = await c.env.DB.prepare(`
      SELECT 
        p.id,
        p.user_id,
        p.amount,
        p.currency,
        p.status,
        p.payment_method,
        p.description,
        p.created_at,
        u.name as user_name,
        u.email as user_email
      FROM payments p
      LEFT JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
      LIMIT 100
    `).all()

    // Calculate totals
    const totals = await c.env.DB.prepare(`
      SELECT 
        COUNT(*) as total_transactions,
        SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) as total_revenue,
        COUNT(DISTINCT user_id) as unique_customers
      FROM payments
      WHERE status = 'completed'
    `).first()

    return c.json({
      success: true,
      payments: allPayments.results || [],
      summary: totals || {
        total_transactions: 0,
        total_revenue: 0,
        unique_customers: 0
      }
    })
  } catch (error) {
    console.error('Get all payments error:', error)
    return c.json({ error: 'Erro ao buscar pagamentos' }, 500)
  }
})

// Create payment (simulate payment processing)
payments.post('/create', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const { amount, description, payment_method = 'credit_card' } = await c.req.json()
    
    if (!amount || amount <= 0) {
      return c.json({ error: 'Valor inválido' }, 400)
    }

    // In production, integrate with payment gateway (Stripe, etc)
    // For now, simulate payment processing
    
    const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
    
    // Insert payment record
    const result = await c.env.DB.prepare(`
      INSERT INTO payments (
        payment_id,
        user_id,
        amount,
        currency,
        status,
        payment_method,
        description,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(
      paymentId,
      user.id,
      amount,
      'BRL',
      'pending',
      payment_method,
      description || 'Pagamento Martech Master'
    ).run()

    // Simulate payment processing delay
    setTimeout(async () => {
      // Update payment status to completed (in production, this would be a webhook)
      await c.env.DB.prepare(`
        UPDATE payments 
        SET status = 'completed', updated_at = CURRENT_TIMESTAMP
        WHERE payment_id = ?
      `).bind(paymentId).run()

      // Update user subscription if needed
      if (description && description.includes('subscription')) {
        const endDate = new Date()
        endDate.setMonth(endDate.getMonth() + 1)
        
        await c.env.DB.prepare(`
          UPDATE users 
          SET subscription_type = 'premium', 
              subscription_end_date = ?
          WHERE id = ?
        `).bind(endDate.toISOString(), user.id).run()
      }
    }, 2000)

    return c.json({
      success: true,
      payment: {
        id: result.meta.last_row_id,
        payment_id: paymentId,
        amount,
        status: 'pending',
        message: 'Pagamento sendo processado'
      }
    })
  } catch (error) {
    console.error('Create payment error:', error)
    return c.json({ error: 'Erro ao processar pagamento' }, 500)
  }
})

// Get payment by ID
payments.get('/:id', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const paymentId = c.req.param('id')
    
    const payment = await c.env.DB.prepare(`
      SELECT 
        id,
        payment_id,
        user_id,
        amount,
        currency,
        status,
        payment_method,
        description,
        created_at,
        updated_at
      FROM payments
      WHERE payment_id = ? AND (user_id = ? OR ?)
    `).bind(paymentId, user.id, user.role === 'admin').first()

    if (!payment) {
      return c.json({ error: 'Pagamento não encontrado' }, 404)
    }

    return c.json({
      success: true,
      payment
    })
  } catch (error) {
    console.error('Get payment error:', error)
    return c.json({ error: 'Erro ao buscar pagamento' }, 500)
  }
})

// Refund payment (admin only)
payments.post('/:id/refund', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    
    if (user.role !== 'admin') {
      return c.json({ error: 'Permissão negada' }, 403)
    }

    const paymentId = c.req.param('id')
    const { reason } = await c.req.json()
    
    // Check if payment exists and is completed
    const payment = await c.env.DB.prepare(`
      SELECT id, status, amount, user_id
      FROM payments
      WHERE payment_id = ? AND status = 'completed'
    `).bind(paymentId).first()

    if (!payment) {
      return c.json({ error: 'Pagamento não encontrado ou não pode ser reembolsado' }, 404)
    }

    // Process refund (in production, call payment gateway API)
    const refundId = `REF-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
    
    // Update payment status
    await c.env.DB.prepare(`
      UPDATE payments 
      SET status = 'refunded', 
          refund_reason = ?,
          refund_id = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE payment_id = ?
    `).bind(reason || 'Reembolso solicitado', refundId, paymentId).run()

    // Create refund record
    await c.env.DB.prepare(`
      INSERT INTO payments (
        payment_id,
        user_id,
        amount,
        currency,
        status,
        payment_method,
        description,
        related_payment_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      refundId,
      payment.user_id,
      -payment.amount,
      'BRL',
      'completed',
      'refund',
      `Reembolso: ${reason || 'Solicitado pelo administrador'}`,
      paymentId
    ).run()

    return c.json({
      success: true,
      refund: {
        refund_id: refundId,
        amount: payment.amount,
        status: 'completed',
        message: 'Reembolso processado com sucesso'
      }
    })
  } catch (error) {
    console.error('Refund error:', error)
    return c.json({ error: 'Erro ao processar reembolso' }, 500)
  }
})

export default payments