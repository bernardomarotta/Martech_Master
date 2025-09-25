import { Hono } from 'hono'
import { sign, verify } from 'hono/jwt'

type Bindings = {
  DB: D1Database
}

const auth = new Hono<{ Bindings: Bindings }>()

// Login endpoint
auth.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json()
    
    if (!email || !password) {
      return c.json({ error: 'Email e senha são obrigatórios' }, 400)
    }

    // Get user from database
    const user = await c.env.DB.prepare(
      'SELECT id, email, name, password_hash FROM users WHERE email = ? AND status = "active"'
    ).bind(email).first()

    if (!user) {
      return c.json({ error: 'Credenciais inválidas' }, 401)
    }

    // Verify password using Web Crypto API
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const computedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    // Compare hashes
    if (computedHash !== user.password_hash) {
      return c.json({ error: 'Credenciais inválidas' }, 401)
    }

    // Generate JWT token
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 24 hours
    }

    const token = await sign(payload, 'martech-master-secret-key-2024')

    // Update last login
    await c.env.DB.prepare(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?'
    ).bind(user.id).run()

    return c.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return c.json({ error: 'Erro ao processar login' }, 500)
  }
})

// Logout endpoint
auth.post('/logout', async (c) => {
  // Client-side will remove the token
  return c.json({ success: true, message: 'Logout realizado com sucesso' })
})

// Verify token endpoint
auth.get('/verify', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ valid: false }, 401)
    }

    const token = authHeader.split(' ')[1]
    
    try {
      const payload = await verify(token, 'martech-master-secret-key-2024')
      
      // Check if token is expired
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        return c.json({ valid: false, error: 'Token expirado' }, 401)
      }
      
      return c.json({ valid: true, user: payload })
    } catch {
      return c.json({ valid: false, error: 'Token inválido' }, 401)
    }
    
  } catch (error) {
    console.error('Verify error:', error)
    return c.json({ valid: false }, 500)
  }
})

// Password reset request
auth.post('/reset-password', async (c) => {
  try {
    const { email } = await c.req.json()
    
    if (!email) {
      return c.json({ error: 'Email é obrigatório' }, 400)
    }

    // Check if user exists
    const user = await c.env.DB.prepare(
      'SELECT id, email FROM users WHERE email = ?'
    ).bind(email).first()

    if (!user) {
      // Don't reveal if user exists or not
      return c.json({ success: true, message: 'Se o email existir, você receberá instruções de reset' })
    }

    // Generate reset token
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const resetExpiry = new Date(Date.now() + 3600000) // 1 hour

    // Store reset token
    await c.env.DB.prepare(
      'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?'
    ).bind(resetToken, resetExpiry.toISOString(), user.id).run()

    // In production, send email with reset link
    // For now, just return success
    console.log(`Reset token for ${email}: ${resetToken}`)

    return c.json({ 
      success: true, 
      message: 'Se o email existir, você receberá instruções de reset' 
    })

  } catch (error) {
    console.error('Reset password error:', error)
    return c.json({ error: 'Erro ao processar reset de senha' }, 500)
  }
})

export default auth