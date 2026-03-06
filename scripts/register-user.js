/**
 * Script para crear una cuenta desde la API (registro).
 * Uso: node scripts/register-user.js <email> <password> [nombre]
 *
 * Ejemplo: node scripts/register-user.js nuevocorreo@ejemplo.com MiPassword123 "Mi Nombre"
 *
 * La API base por defecto es https://osdemsventas.site
 * Para otra URL: VITE_API_BASE=https://tu-api.com node scripts/register-user.js email password
 *
 * Nota: Si el backend exige formato de contraseña (mínimo caracteres, mayúsculas, etc.),
 * usa una contraseña que cumpla esas reglas.
 */

const API_BASE = process.env.VITE_API_BASE || 'https://osdemsventas.site'
const BASE_URL = API_BASE.startsWith('http') ? API_BASE : `https://${API_BASE}`

async function register(email, password, name = '') {
  const body = { email: email.trim(), password }
  if (name && String(name).trim()) body.name = String(name).trim()

  const endpoints = ['/api/v1/auth/register', '/api/v1/auth/signup', '/api/v1/auth/sign-up']
  let lastError
  for (const path of endpoints) {
    const url = `${BASE_URL}${path}`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const text = await res.text()
    let data
    try {
      data = JSON.parse(text)
    } catch {
      data = { message: text }
    }
    if (res.ok) return data
    lastError = data?.message || data?.error || `HTTP ${res.status}: ${text}`
    if (res.status === 404) continue
    break
  }
  throw new Error(lastError)
}

const [,, email, password, name] = process.argv
if (!email || !password) {
  console.error('Uso: node scripts/register-user.js <email> <password> [nombre]')
  console.error('Ejemplo: node scripts/register-user.js usuario@ejemplo.com MiClave123')
  process.exit(1)
}

register(email, password, name || '')
  .then((data) => {
    console.log('Cuenta creada correctamente.')
    console.log(JSON.stringify(data, null, 2))
    if (data.token) {
      console.log('\nToken recibido. Ya puedes iniciar sesión en la app con este email y contraseña.')
    }
  })
  .catch((err) => {
    console.error('Error:', err.message)
    process.exit(1)
  })
