import { Hono } from 'hono'
import { verify } from 'hono/jwt'

type Bindings = {
  DB: D1Database
}

const members = new Hono<{ Bindings: Bindings }>()

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

// Get all members
members.get('/', requireAuth, async (c) => {
  try {
    const members = await c.env.DB.prepare(`
      SELECT 
        id, 
        email, 
        name, 
        role, 
        status,
        subscription_type,
        subscription_end_date,
        created_at,
        last_login
      FROM users 
      WHERE status = 'active'
      ORDER BY created_at DESC
    `).all()

    return c.json({
      success: true,
      members: members.results
    })
  } catch (error) {
    console.error('Get members error:', error)
    return c.json({ error: 'Erro ao buscar membros' }, 500)
  }
})

// Get member by ID
members.get('/:id', requireAuth, async (c) => {
  try {
    const id = c.req.param('id')
    
    const member = await c.env.DB.prepare(`
      SELECT 
        id, 
        email, 
        name, 
        role, 
        status,
        subscription_type,
        subscription_end_date,
        created_at,
        last_login,
        total_purchases,
        courses_completed
      FROM users 
      WHERE id = ?
    `).bind(id).first()

    if (!member) {
      return c.json({ error: 'Membro não encontrado' }, 404)
    }

    return c.json({
      success: true,
      member
    })
  } catch (error) {
    console.error('Get member error:', error)
    return c.json({ error: 'Erro ao buscar membro' }, 500)
  }
})

// Create new member
members.post('/', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    
    // Check if user is admin
    if (user.role !== 'admin') {
      return c.json({ error: 'Permissão negada' }, 403)
    }

    const { email, name, role = 'member', subscription_type = 'basic' } = await c.req.json()
    
    if (!email || !name) {
      return c.json({ error: 'Email e nome são obrigatórios' }, 400)
    }

    // Check if email already exists
    const existing = await c.env.DB.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(email).first()

    if (existing) {
      return c.json({ error: 'Email já está em uso' }, 409)
    }

    // Generate temporary password
    const tempPassword = Math.random().toString(36).substring(2, 15)
    const encoder = new TextEncoder()
    const data = encoder.encode(tempPassword)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const passwordHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    // Insert new member
    const result = await c.env.DB.prepare(`
      INSERT INTO users (email, name, password_hash, role, status, subscription_type)
      VALUES (?, ?, ?, ?, 'active', ?)
    `).bind(email, name, passwordHash, role, subscription_type).run()

    return c.json({
      success: true,
      member: {
        id: result.meta.last_row_id,
        email,
        name,
        role,
        subscription_type,
        tempPassword // In production, send this via email
      }
    })
  } catch (error) {
    console.error('Create member error:', error)
    return c.json({ error: 'Erro ao criar membro' }, 500)
  }
})

// Update member
members.put('/:id', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const id = c.req.param('id')
    
    // Check if user is admin or updating own profile
    if (user.role !== 'admin' && user.id !== parseInt(id)) {
      return c.json({ error: 'Permissão negada' }, 403)
    }

    const updates = await c.req.json()
    const allowedFields = ['name', 'role', 'status', 'subscription_type', 'subscription_end_date']
    
    // Build update query
    const setClause = []
    const values = []
    
    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        setClause.push(`${field} = ?`)
        values.push(updates[field])
      }
    }
    
    if (setClause.length === 0) {
      return c.json({ error: 'Nenhum campo para atualizar' }, 400)
    }
    
    values.push(id)
    
    await c.env.DB.prepare(`
      UPDATE users 
      SET ${setClause.join(', ')}
      WHERE id = ?
    `).bind(...values).run()

    return c.json({
      success: true,
      message: 'Membro atualizado com sucesso'
    })
  } catch (error) {
    console.error('Update member error:', error)
    return c.json({ error: 'Erro ao atualizar membro' }, 500)
  }
})

// Delete member (soft delete)
members.delete('/:id', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    
    // Only admins can delete members
    if (user.role !== 'admin') {
      return c.json({ error: 'Permissão negada' }, 403)
    }

    const id = c.req.param('id')
    
    await c.env.DB.prepare(`
      UPDATE users 
      SET status = 'deleted', deleted_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(id).run()

    return c.json({
      success: true,
      message: 'Membro removido com sucesso'
    })
  } catch (error) {
    console.error('Delete member error:', error)
    return c.json({ error: 'Erro ao remover membro' }, 500)
  }
})

export default members