import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const SECOND_LOGO_URL = 'https://osdemsdigital.com/wp-content/uploads/2026/03/loogo-app.png'

export function HeaderBar() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const scrollToCampaign = () => {
    document.getElementById('wf-strip')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="nav-bar nav-bar--minimal">
      <div className="nav-bar-inner">
        <button type="button" className="nav-bar-logo-link" onClick={scrollToCampaign} aria-label="Ir a Tu campaña">
          <img src={SECOND_LOGO_URL} alt="" className="nav-bar-second-logo" />
        </button>
        <button type="button" className="nav-bar-logout nav-bar-logout--icon" onClick={handleLogout} aria-label="Cerrar sesión">
          <i className="fas fa-right-from-bracket" aria-hidden />
        </button>
      </div>
    </header>
  )
}
