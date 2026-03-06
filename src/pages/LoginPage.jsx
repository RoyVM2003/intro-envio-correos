import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login, register as apiRegister, setToken, setEmail } from '../lib/api'
import { useLanguage } from '../context/LanguageContext'

const LOGO_URL = 'https://osdemsdigital.com/wp-content/uploads/2026/03/loogo-app.png'

/**
 * Login con card (navy/gold). Ruta: /acceso. Tras login → /campana.
 * Incluye formulario temporal "Crear cuenta" (registro) para poder usar las APIs.
 */
export function LoginPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [showRegister, setShowRegister] = useState(false)
  const [email, setEmailInput] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })

  const showMsg = (text, type) => setMessage({ text, type })

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      showMsg(t('login.errorRequired'), 'err')
      return
    }
    setLoading(true)
    showMsg(t('login.connecting'), 'info')
    try {
      const data = await login(email.trim(), password)
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

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      showMsg(t('login.errorRequired'), 'err')
      return
    }
    setLoading(true)
    showMsg(t('login.registerCreating'), 'info')
    try {
      const data = await apiRegister(email.trim(), password, name.trim())
      const token = data.token || data.accessToken || data.access_token
      if (token) {
        setToken(token)
        setEmail(email.trim())
        showMsg('', '')
        navigate('/campana', { replace: true })
      } else {
        setShowRegister(false)
        showMsg(t('login.registerSuccess'), 'ok')
      }
    } catch (err) {
      showMsg(err?.message || t('login.registerError'), 'err')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id="loginPage" className="login-page">
      <div className="login-page-bg" />
      <div className="login-page-card">
        <Link to="/" className="login-page-logo">
          <img src={LOGO_URL} alt="OSDEMS" />
        </Link>
        <h1 className="login-page-title">
          {showRegister ? t('login.registerTitle') : t('login.title')}
        </h1>
        <p className="login-page-subtitle">
          {showRegister ? t('login.registerSubtitle') : t('login.subtitle')}
        </p>

        {message.text && (
          <div className={`login-msg login-msg--${message.type}`} role="alert">
            {message.text}
          </div>
        )}

        {showRegister ? (
          <form className="login-form" onSubmit={handleRegister}>
            <div className="login-form-group">
              <label htmlFor="register-name">Nombre (opcional)</label>
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                autoComplete="name"
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="register-email">{t('login.email')}</label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder={t('login.placeholderEmail')}
                autoComplete="email"
                required
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="register-password">{t('login.password')}</label>
              <input
                id="register-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? t('login.registerCreating') : t('login.registerSubmit')}
            </button>
          </form>
        ) : (
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
        )}

        <p className="login-page-back">
          {showRegister ? (
            <button type="button" className="login-page-link" onClick={() => { setShowRegister(false); showMsg('', '') }}>
              {t('login.alreadyHaveAccount')}
            </button>
          ) : (
            <>
              <button type="button" className="login-page-link" onClick={() => { setShowRegister(true); showMsg('', '') }}>
                {t('login.createAccount')}
              </button>
              {' · '}
              <Link to="/">{t('login.back')}</Link>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
