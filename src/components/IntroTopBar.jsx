import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { LanguageSelector } from './LanguageSelector'
import './IntroTopBar.css'

/**
 * Barra fija arriba a la derecha: OSDEMS Digital | Idiomas | Iniciar sesión
 * Renderizada en document.body vía portal para que position:fixed nunca se rompa
 */
export function IntroTopBar() {
  const { t } = useLanguage()

  const content = (
    <div
      id="intro-top-bar-fixed"
      className="intro-top-bar"
      style={{ position: 'fixed', top: '1.25rem', right: '1.5rem', zIndex: 99999 }}
    >
      <a
        href="https://osdemsdigital.com"
        target="_blank"
        rel="noopener noreferrer"
        className="intro-top-bar-link"
      >
        {t('common.digitalLink')}
      </a>
      <LanguageSelector usePortal={false} />
      <Link to="/login" className="intro-top-bar-link intro-top-bar-login">
        {t('common.login')}
      </Link>
    </div>
  )

  return createPortal(content, document.body)
}
