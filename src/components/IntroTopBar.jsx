import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { LanguageSelector } from './LanguageSelector'
import './IntroTopBar.css'

/**
 * OSDEMS Digital | Idiomas | Iniciar sesión — flotando arriba a la derecha
 */
export function IntroTopBar() {
  const { t } = useLanguage()

  const content = (
    <div className="intro-top-bar intro-top-bar--fixed">
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
