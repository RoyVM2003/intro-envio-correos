import { API_BASE } from '../config/api'
import { getToken } from '../lib/api'

export async function apiEmail(endpoint, options = {}) {
  const token = getToken()
  const headers = { ...(options.headers || {}) }
  if (token && !headers.Authorization) headers.Authorization = 'Bearer ' + token
  if (!options.skipContentType && options.body !== undefined && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }
  const base = API_BASE || ''
  const url = base + endpoint
  const res = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body instanceof FormData ? options.body : (options.body ? JSON.stringify(options.body) : undefined),
  })
  const text = await res.text()
  let data
  try { data = JSON.parse(text) } catch (_) { data = text }
  if (!res.ok) throw { status: res.status, data }
  return data
}
