import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../context/LanguageContext'
import { LANGUAGES } from '../data/translations'
import './LanguageSelector.css'

export function LanguageSelector({ usePortal = true }) {
  const { lang, setLang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]

  const content = (
    <div className={`lang-selector ${!usePortal ? 'lang-selector--inline' : ''}`} ref={ref}>
      <button
        type="button"
        className="lang-selector-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('common.selectLanguage')}
        title={current.name}
      >
        <i className="fas fa-globe" aria-hidden />
        <span className="lang-selector-current">{current.code.toUpperCase()}</span>
        <i className={`fas fa-chevron-down lang-selector-chevron${open ? ' lang-selector-chevron--open' : ''}`} aria-hidden />
      </button>
      {open && (
        <ul className="lang-selector-dropdown" role="listbox">
          {LANGUAGES.map((l) => (
            <li key={l.code} role="option" aria-selected={lang === l.code}>
              <button
                type="button"
                className={`lang-selector-option${lang === l.code ? ' lang-selector-option--active' : ''}`}
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                }}
              >
                {l.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  return usePortal ? createPortal(content, document.body) : content
}
