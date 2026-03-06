import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { LanguageSelector } from './LanguageSelector'
import './IntroTopBar.css'

/**
 * Enlaces: OSDEMS Digital | Idiomas | Iniciar sesión
 * Se usa dentro de intro-top-strip (sticky) en IntroPage
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
