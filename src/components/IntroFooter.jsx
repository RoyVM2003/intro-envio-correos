import { useLanguage } from '../context/LanguageContext'
import './IntroFooter.css'

const FOOTER_BLOCKS = [
  {
    titleKey: 'intro.footer.techTitle',
    items: ['intro.footer.tech1', 'intro.footer.tech2', 'intro.footer.tech3', 'intro.footer.tech4'],
  },
  {
    titleKey: 'intro.footer.solutionsTitle',
    items: ['intro.footer.sol1', 'intro.footer.sol2', 'intro.footer.sol3', 'intro.footer.sol4'],
  },
]

export function IntroFooter() {
  const { t } = useLanguage()

  return (
    <footer className="intro-footer">
      <div className="intro-footer-inner">
        {FOOTER_BLOCKS.map((block) => (
          <div key={block.titleKey} className="intro-footer-block">
            <h4 className="intro-footer-title">{t(block.titleKey)}</h4>
            <ul className="intro-footer-list">
              {block.items.map((itemKey) => (
                <li key={itemKey}>
                  <span>{t(itemKey)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}
