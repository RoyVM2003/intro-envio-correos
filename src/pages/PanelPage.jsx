import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { getToken } from '../lib/api'

export function PanelPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
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
              <span className="home-hero-greeting-label">{t('panel.greetingLabel')}</span>
            </div>
            <div className="home-hero-greeting-name">
              {t('panel.hello')}, <span className="hw-name-light">{isLoggedIn ? username : t('panel.visitor')}</span>
            </div>
            <div className="home-hero-greeting-sub">{t('panel.prepared')}</div>
            {isLoggedIn ? (
              <>
                <Link to="/acceso" className="home-hero-btn home-hero-btn--campana" replace>
                  {t('panel.accessCampaign')}
                </Link>
                <button type="button" className="home-hero-btn home-hero-btn--logout" onClick={handleLogout} aria-label={t('home.logout')}>
                  <i className="fas fa-right-from-bracket" aria-hidden /> {t('panel.logout')}
                </button>
              </>
            ) : (
              <Link to="/acceso" className="home-hero-btn home-hero-btn--access" replace>
                {t('panel.accessPanel')}
              </Link>
            )}
          </div>

          <div className="home-hero-text reveal reveal-slow reveal-delay-1">
            <div className="home-hero-eyebrow">{t('panel.eyebrow')}</div>
            <h1 className="home-hero-h1">
              {t('panel.title1')}
              <br />
              {t('panel.title2')}
            </h1>
            <p className="home-hero-desc">
              {t('panel.desc')}
            </p>
          </div>
        </div>

        <section className="panel-foot-strip" aria-label={t('panel.footLead')}>
          <div className="panel-foot-inner">
            <p className="panel-foot-lead">
              <strong>{t('panel.footLead')}</strong>
            </p>
            <div className="panel-foot-bullets">
              <span className="panel-foot-bullet"><i className="fas fa-check-circle" aria-hidden /> {t('panel.footBullet1')}</span>
              <span className="panel-foot-bullet"><i className="fas fa-check-circle" aria-hidden /> {t('panel.footBullet2')}</span>
              <span className="panel-foot-bullet"><i className="fas fa-check-circle" aria-hidden /> {t('panel.footBullet3')}</span>
            </div>
            <p className="panel-foot-cta">
              {t('panel.footCta')}
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
