import { useState } from 'react'
import { contact } from '../lib/api'

/**
 * Formulario de Diagnóstico Estratégico.
 * Envía los datos a POST /api/v1/contact.
 */
export function DiagnosisForm({ t }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.email?.trim()) {
      setError(t('common.required') || 'El correo es obligatorio.')
      return
    }
    setLoading(true)
    try {
      await contact({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.company?.trim() || '',
      })
      setSent(true)
      setForm({ name: '', email: '', phone: '', company: '' })
    } catch (err) {
      setError(err?.message || 'No se pudo enviar. Intenta más tarde.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <section className="intro-diagnosis">
        <div className="intro-diagnosis-inner">
          <div className="intro-diagnosis-card">
            <h3 className="intro-diagnosis-title">{t('intro.diagnosis.title')}</h3>
            <p className="intro-diagnosis-success">
              {t('intro.diagnosis.success') || 'Gracias. Un experto analizará tus datos y te contactará en breve.'}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="intro-diagnosis">
      <div className="intro-diagnosis-inner">
        <div className="intro-diagnosis-card">
          <h3 className="intro-diagnosis-title">{t('intro.diagnosis.title')}</h3>
          <form className="intro-diagnosis-form" onSubmit={handleSubmit}>
            <div className="intro-diagnosis-row">
              <div className="intro-diagnosis-group">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t('intro.diagnosis.placeholderName')}
                  autoComplete="name"
                  disabled={loading}
                />
              </div>
              <div className="intro-diagnosis-group">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t('intro.diagnosis.placeholderEmail')}
                  autoComplete="email"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="intro-diagnosis-row">
              <div className="intro-diagnosis-group">
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={t('intro.diagnosis.placeholderPhone')}
                  autoComplete="tel"
                  disabled={loading}
                />
              </div>
              <div className="intro-diagnosis-group">
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder={t('intro.diagnosis.placeholderCompany')}
                  autoComplete="organization"
                  disabled={loading}
                />
              </div>
            </div>
            {error && <p className="intro-diagnosis-error" role="alert">{error}</p>}
            <button type="submit" className="intro-diagnosis-btn" disabled={loading}>
              {loading ? (t('common.sending') || 'Enviando…') : t('intro.diagnosis.button')}
            </button>
          </form>
          <p className="intro-diagnosis-footer">
            {t('intro.diagnosis.footer')}{' '}
            <a href="https://osdemsdigital.com/privacy" target="_blank" rel="noopener noreferrer">{t('intro.diagnosis.privacy')}</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
