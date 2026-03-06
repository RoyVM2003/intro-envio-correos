/**
 * API auth y base URL. Misma configuración que el front anterior (panel-ventas) en Dokploy.
 * En Dokploy: Environment → VITE_API_BASE y opcionalmente VITE_API_AI_BASE (p. ej. https://osdemsventas.site).
 * En desarrollo sin .env: peticiones a mismo origen y Vite proxy reenvía a la API.
 */
const DEFAULT_API_BASE = 'https://osdemsventas.site'
const API_BASE = (import.meta.env.VITE_API_BASE && String(import.meta.env.VITE_API_BASE).trim()) || DEFAULT_API_BASE
const API_BASE_URL = import.meta.env.DEV && !import.meta.env.VITE_API_BASE
  ? '' // en dev, /api → proxy en vite.config.js
  : (API_BASE.startsWith('http') ? API_BASE : `https://${API_BASE}`)

export const TOKEN_KEY = 'osdemsventas_token'
export const EMAIL_KEY = 'osdemsventas_email'

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) sessionStorage.setItem(TOKEN_KEY, token)
  else sessionStorage.removeItem(TOKEN_KEY)
}

export function getEmail() {
  return sessionStorage.getItem(EMAIL_KEY)
}

export function setEmail(email) {
  if (email) sessionStorage.setItem(EMAIL_KEY, email)
  else sessionStorage.removeItem(EMAIL_KEY)
}

/**
 * Registro de nueva cuenta. POST /api/v1/auth/register
 * El backend espera first_name (2-50 caracteres).
 * @returns { Promise<{ user?: object, token?: string, message?: string }> }
 */
export async function register(email, password, firstName = '') {
  const url = `${API_BASE_URL}/api/v1/auth/register`
  const first = String(firstName || '').trim()
  const body = { email: email.trim(), password, first_name: first || email.trim().split('@')[0] || 'Usuario' }
  if (body.first_name.length < 2) body.first_name = body.first_name.padEnd(2, ' ') || 'Usuario'
  if (body.first_name.length > 50) body.first_name = body.first_name.slice(0, 50)
  let res
  let text = ''
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    text = await res.text()
  } catch (_) {
    throw new Error('No se pudo conectar con el servidor. Comprueba tu conexión.')
  }
  let data
  try {
    data = JSON.parse(text)
  } catch {
    data = { message: text || 'Error en el registro' }
  }
  if (!res.ok) {
    let msg = data?.message || data?.error || (typeof data === 'object' ? JSON.stringify(data) : text)
    if (Array.isArray(data?.errors) && data.errors.length > 0) {
      const details = data.errors.map((e) => e.msg || e.message).filter(Boolean).join('. ')
      if (details) msg = `${msg}: ${details}`
    }
    throw new Error(msg)
  }
  return data
}

/**
 * Login vía API de inicio de sesión.
 * @returns { Promise<{ token?: string, accessToken?: string, access_token?: string }> }
 */
export async function login(email, password) {
  const url = `${API_BASE_URL}/api/v1/auth/login`
  let res
  let text = ''
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), password }),
    })
    text = await res.text()
  } catch (_) {
    throw new Error('No se pudo conectar con el servidor. Comprueba tu conexión.')
  }

  let data
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error(text || 'Error al iniciar sesión')
  }
  if (!res.ok) {
    const msg = data?.message || data?.error || (typeof data === 'object' ? JSON.stringify(data) : text)
    throw new Error(msg)
  }
  return data
}

/**
 * Olvidar contraseña: POST /api/v1/auth/forgot-password { email }
 * (Si el backend no expone este endpoint, devolverá 404/501; el mensaje se muestra al usuario.)
 */
export async function forgotPassword(email) {
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim() }),
  })
  const text = await res.text()
  let data
  try {
    data = JSON.parse(text)
  } catch {
    data = text
  }
  if (!res.ok) {
    const msg = data?.message || data?.error || (typeof data === 'object' ? JSON.stringify(data) : text)
    throw { status: res.status, data: data || { message: msg } }
  }
  return data
}

/** Verificar cuenta con código enviado por correo. POST /api/v1/auth/verify */
export async function verifyEmail(email, code) {
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: String(email).trim(), code: String(code).trim() }),
  })
  const text = await res.text()
  let data
  try { data = JSON.parse(text) } catch { data = text }
  if (!res.ok) throw { status: res.status, data }
  return data
}

/** Reenviar correo de verificación. POST /api/v1/auth/resend-verification */
export async function resendVerification(email) {
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/resend-verification`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: String(email).trim() }),
  })
  const text = await res.text()
  let data
  try { data = JSON.parse(text) } catch { data = text }
  if (!res.ok) throw { status: res.status, data }
  return data
}

/**
 * Admin: obtener usuarios. GET /api/v1/admin/users
 * Requiere token de administrador.
 */
export async function adminGetUsers() {
  const token = getToken()
  if (!token) throw new Error('Debes iniciar sesión.')
  const res = await fetch(`${API_BASE_URL}/api/v1/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const text = await res.text()
  let data
  try {
    data = JSON.parse(text)
  } catch {
    data = { message: text }
  }
  if (!res.ok) throw new Error(data?.message || data?.error || 'No tienes permisos de administrador.')
  return Array.isArray(data) ? data : data?.users ?? data?.data ?? []
}

/**
 * Admin: actualizar usuario (p. ej. cambiar rol). PUT /api/v1/admin/users/{id}
 */
export async function adminUpdateUser(userId, payload) {
  const token = getToken()
  if (!token) throw new Error('Debes iniciar sesión.')
  const res = await fetch(`${API_BASE_URL}/api/v1/admin/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  })
  const text = await res.text()
  let data
  try {
    data = JSON.parse(text)
  } catch {
    data = { message: text }
  }
  if (!res.ok) throw new Error(data?.message || data?.error || 'No se pudo actualizar.')
  return data
}

export { API_BASE, API_BASE_URL }
