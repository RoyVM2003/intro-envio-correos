import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login, setToken, setEmail, getToken } from '../lib/api'
import { useLanguage } from '../context/LanguageContext'

const LOGO_URL = 'https://osdemsdigital.com/wp-content/uploads/2026/03/loogo-app.png'
const DEFAULT_EMAIL = 'marketing@osdemsdigital.com'
const DEFAULT_PASSWORD = 'Osdems12345672026@@@'

/**
 * Login con card (navy/gold). Ruta: /acceso. Tras login → /campana.
 */
export function LoginPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [email, setEmailInput] = useState(DEFAULT_EMAIL)
  const [password, setPassword] = useState(DEFAULT_PASSWORD)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })

  const showMsg = (text, type) => setMessage({ text, type })

  useEffect(() => {
    if (getToken()) {
      navigate('/campana', { replace: true })
      return
    }
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      showMsg(t('login.errorRequired'), 'err')
      return
    }
    setLoading(true)
    showMsg(t('login.connecting'), 'info')
    try {
      const data = await login(email, password)
      const token = data.token || data.accessToken || data.access_token
      if (!token) {
        showMsg(t('login.errorApi'), 'err')
        return
      }
      setToken(token)
      setEmail(email.trim())
      showMsg('', '')
      navigate('/campana', { replace: true })
    } catch (err) {
      showMsg(err?.message || t('login.errorLogin'), 'err')
    } finally {
      setLoading(false)
    }
  }

  if (getToken()) return null

  return (
    <div id="loginPage" className="login-page">
      <div className="login-page-bg" />
      <div className="login-page-card">
        <Link to="/" className="login-page-logo">
          <img src={LOGO_URL} alt="OSDEMS" />
        </Link>
        <h1 className="login-page-title">{t('login.title')}</h1>
        <p className="login-page-subtitle">{t('login.subtitle')}</p>

        {message.text && (
          <div className={`login-msg login-msg--${message.type}`} role="alert">
            {message.text}
          </div>
        )}

        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-form-group">
            <label htmlFor="login-email">{t('login.email')}</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder={t('login.placeholderEmail')}
              autoComplete="email"
              required
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="login-password">{t('login.password')}</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? t('login.entering') : t('login.submit')}
          </button>
        </form>

        <p className="login-page-back">
          <Link to="/">{t('login.back')}</Link>
        </p>
      </div>
    </div>
  )
}
