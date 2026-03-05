import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login, setToken, setEmail, getToken } from '../lib/api'

const LOGO_URL = 'https://osdemsdigital.com/wp-content/uploads/2026/03/loogo-app.png'

/**
 * Primer login — pantalla original (card navy/gold, Iniciar sesión, Accede al panel de campañas).
 * Ruta: /login. Enlace desde la intro "Iniciar sesión". No modificar.
 */
export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmailInput] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })

  const showMsg = (text, type) => setMessage({ text, type })

  useEffect(() => {
    if (getToken()) {
      navigate('/panel', { replace: true })
      return
    }
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      showMsg('Introduce correo y contraseña.', 'err')
      return
    }
    setLoading(true)
    showMsg('Conectando...', 'info')
    try {
      const data = await login(email, password)
      const token = data.token || data.accessToken || data.access_token
      if (!token) {
        showMsg('La API no devolvió token.', 'err')
        return
      }
      setToken(token)
      setEmail(email.trim())
      showMsg('', '')
      navigate('/panel', { replace: true })
    } catch (err) {
      showMsg(err?.message || 'Error al iniciar sesión.', 'err')
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
        <h1 className="login-page-title">Iniciar sesión</h1>
        <p className="login-page-subtitle">Accede al panel de campañas con tu cuenta.</p>

        {message.text && (
          <div className={`login-msg login-msg--${message.type}`} role="alert">
            {message.text}
          </div>
        )}

        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-form-group">
            <label htmlFor="login-email">Correo</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="tu@email.com"
              autoComplete="email"
              required
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="login-password">Contraseña</label>
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
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <p className="login-page-back">
          <Link to="/">← Volver a la introducción</Link>
        </p>
      </div>
    </div>
  )
}
