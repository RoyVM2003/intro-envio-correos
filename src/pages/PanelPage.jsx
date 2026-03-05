import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { getToken } from '../lib/api'

export function PanelPage() {
  const navigate = useNavigate()
  useScrollReveal()
  const { email, logout } = useAuth()
  const username = email ? email.split('@')[0] : 'Usuario'
  const isLoggedIn = !!getToken()

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <div id="app" className="app-dark-page panel-page-full">
      <div className="app-dark-content">
        <div className="home-hero home-hero--full">
          <div className="home-hero-bg">
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1920&q=90"
              className="home-hero-img"
              alt=""
            />
          </div>
          <div className="home-hero-overlay" />

          <div className="home-hero-greeting reveal reveal-slow reveal-from-left">
            <div className="home-hero-greeting-top">
              <span className="home-hero-greeting-label">Panel activo</span>
            </div>
            <div className="home-hero-greeting-name">
              Hola, <span className="hw-name-light">{isLoggedIn ? username : 'visitante'}</span>
            </div>
            <div className="home-hero-greeting-sub">preparado para la próxima campaña</div>
            {isLoggedIn ? (
              <>
                <Link to="/acceso" className="home-hero-btn home-hero-btn--campana" replace>
                  Acceder a tu campaña
                </Link>
                <button type="button" className="home-hero-btn home-hero-btn--logout" onClick={handleLogout} aria-label="Cerrar sesión">
                  <i className="fas fa-right-from-bracket" aria-hidden /> Salir de la cuenta
                </button>
              </>
            ) : (
              <Link to="/acceso" className="home-hero-btn home-hero-btn--access" replace>
                Acceder al panel
              </Link>
            )}
          </div>

          <div className="home-hero-text reveal reveal-slow reveal-delay-1">
            <div className="home-hero-eyebrow">CONFIGURA TU SUEÑO</div>
            <h1 className="home-hero-h1">
              Email marketing que habla
              <br />
              el idioma del dinero
            </h1>
            <p className="home-hero-desc">
              Ahorra tiempo a tu equipo, protege tu presupuesto y lanza campañas
              que venden como un auto premium, no como un cupón de comida rápida.
            </p>
          </div>
        </div>

        <section className="panel-foot-strip" aria-label="Por qué elegirnos">
          <div className="panel-foot-inner">
            <p className="panel-foot-lead">
              <strong>Menos ruido, más resultados.</strong> Segmenta, personaliza y mide cada envío con herramientas pensadas para equipos que venden en serio.
            </p>
            <div className="panel-foot-bullets">
              <span className="panel-foot-bullet"><i className="fas fa-check-circle" aria-hidden /> Envíos con IA y plantillas profesionales</span>
              <span className="panel-foot-bullet"><i className="fas fa-check-circle" aria-hidden /> Importa contactos desde Excel en segundos</span>
              <span className="panel-foot-bullet"><i className="fas fa-check-circle" aria-hidden /> Sin sorpresas en la factura: control total de tu campaña</span>
            </div>
            <p className="panel-foot-cta">
              Accede a tu campaña arriba y lanza tu primer envío hoy.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
