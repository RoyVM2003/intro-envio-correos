import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getEmail, getToken, setToken, setEmail } from '../lib/api'

const HOME_HERO_IMAGE = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80'

export function HomePage() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')

  useEffect(() => {
    if (!getToken()) {
      navigate('/login', { replace: true })
      return
    }
    const email = getEmail() || ''
    const name = email.split('@')[0] || 'Usuario'
    setUserName(name)
  }, [navigate])

  const handleLogout = () => {
    setToken('')
    setEmail('')
    navigate('/login', { replace: true })
  }

  if (!getToken()) return null

  return (
    <div className="home-hero-wrap">
      <div className="home-hero-bg" style={{ backgroundImage: `url(${HOME_HERO_IMAGE})` }} />
      <div className="home-hero-overlay" />

      <button type="button" className="home-hero-logout" onClick={handleLogout}>
        Cerrar sesión
      </button>

      <span className="home-hero-capsule">CONFIGURA TU SUEÑO</span>
      <h1 className="home-hero-title">
        Email marketing que habla el idioma del dinero
      </h1>
      <p className="home-hero-tagline">
        Ahorra tiempo a tu equipo, protege tu presupuesto y lanza campañas que venden como un auto premium, no como un cupón de comida rápida.
      </p>

      <div className="home-welcome-panel">
        <span className="home-welcome-badge">PANEL ACTIVO</span>
        <p className="home-welcome-greeting">Hola, {userName}</p>
        <p className="home-welcome-text">preparado para la próxima campaña</p>
        <Link to="/panel" className="home-welcome-cta">
          Acceder al panel
        </Link>
      </div>
    </div>
  )
}
