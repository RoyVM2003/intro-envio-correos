import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { LanguageSelector } from './LanguageSelector'
import './IntroTopBar.css'

/**
 * Barra fija arriba a la derecha: OSDEMS Digital | Idiomas | Iniciar sesión
 * No hace scroll (position: fixed)
 */
export function IntroTopBar() {
  const { t } = useLanguage()

  return (
    <div className="intro-top-bar">
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
}
