import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { LanguageSelector } from './LanguageSelector'
import './IntroTopBar.css'

/**
 * OSDEMS Digital | Idiomas | Iniciar sesión — renderizado en header del HTML (fuera de #app)
 */
export function IntroTopBar() {
  const { t } = useLanguage()
  const content = (
    <div
      className="intro-top-bar"
      style={{
        position: 'fixed',
        top: '1.25rem',
        right: '1.5rem',
        zIndex: 2147483647,
        transform: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
      }}
    >
      <a
        href="https://osdemsdigital.com"
        target="_blank"
        rel="noopener noreferrer"
        className="intro-top-bar-link"
      >
        {t('common.digitalLink')}
      </a>
      <div className="intro-top-bar-lang-wrap">
        <LanguageSelector usePortal={false} />
      </div>
      <Link to="/login" className="intro-top-bar-link intro-top-bar-login">
        {t('common.login')}
      </Link>
    </div>
  )

  return createPortal(content, document.body)
}
