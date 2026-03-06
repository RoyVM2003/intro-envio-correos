import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getEmail, getToken, setToken, setEmail } from '../lib/api'
import { useLanguage } from '../context/LanguageContext'

const HOME_HERO_IMAGE = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80'

export function HomePage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
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
        {t('home.logout')}
      </button>

      <span className="home-hero-capsule">{t('home.capsule')}</span>
      <h1 className="home-hero-title">
        {t('home.title')}
      </h1>
      <p className="home-hero-tagline">
        {t('home.tagline')}
      </p>

      <div className="home-welcome-panel">
        <span className="home-welcome-badge">{t('home.panelActive')}</span>
        <p className="home-welcome-greeting">{t('home.greeting')}, {userName}</p>
        <p className="home-welcome-text">{t('home.prepared')}</p>
        <Link to="/panel" className="home-welcome-cta">
          {t('home.accessPanel')}
        </Link>
      </div>
    </div>
  )
}
