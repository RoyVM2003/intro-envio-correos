import { useLanguage } from '../context/LanguageContext'
import './IntroFooter.css'

export function IntroFooter() {
  const { t } = useLanguage()

  return (
    <footer className="intro-footer">
      <div className="intro-footer-inner">
        {/* Tecnología e innovación */}
        <div className="intro-footer-block">
          <h4 className="intro-footer-title">{t('intro.footer.techTitle')}</h4>
          <ul className="intro-footer-list">
            {['tech1', 'tech2', 'tech3', 'tech4'].map((key) => (
              <li key={key}>{t(`intro.footer.${key}`)}</li>
            ))}
          </ul>
        </div>

        {/* Tu siguiente paso */}
        <div className="intro-footer-block intro-footer-block--cta">
          <h4 className="intro-footer-title">{t('intro.cta.heading')}</h4>
          <p className="intro-footer-cta-text">{t('intro.cta.text')}</p>
        </div>

        {/* Nuestras soluciones */}
        <div className="intro-footer-block">
          <h4 className="intro-footer-title">{t('intro.footer.solutionsTitle')}</h4>
          <ul className="intro-footer-list">
            {['sol1', 'sol2', 'sol3', 'sol4'].map((key) => (
              <li key={key}>{t(`intro.footer.${key}`)}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
