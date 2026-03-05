import { apiEmail } from './api'

export async function createCampaign({ name, subject, body }) {
  const n = name || subject || 'Campaña'
  const email = `plantilla-${Date.now()}@noreply.local`
  const payload = {
    name: n,
    subject: subject || n,
    body: body || '',
    email,
    nombre: n,
    compañía: n,
    compania: n,
    company: n,
    data: { email, nombre: n, compañía: n },
  }
  return apiEmail('/api/v1/excel/campaigns', { method: 'POST', body: payload })
}

export async function getCampaign(id) {
  return apiEmail(`/api/v1/excel/campaigns/${encodeURIComponent(id)}`)
}

export async function updateCampaign(id, { name, subject, body }) {
  const n = name || subject || 'Campaña'
  const email = `plantilla-${String(id)}@noreply.local`
  return apiEmail(`/api/v1/excel/campaigns/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: {
      name: n,
      subject: subject || n,
      body: body || '',
      email,
      nombre: n,
      compañía: n,
      compania: n,
      company: n,
    },
  })
}

export async function deleteCampaign(id) {
  return apiEmail(`/api/v1/excel/campaigns/${encodeURIComponent(id)}`, { method: 'DELETE' })
}

export async function sendCampaign(subject, message) {
  return apiEmail('/api/v1/campaigns/send', {
    method: 'POST',
    body: { subject, message, body: message },
  })
}
