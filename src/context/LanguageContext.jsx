import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { getTranslation } from '../data/translations'

const STORAGE_KEY = 'intro-envio-lang'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'es'
    } catch {
      return 'es'
    }
  })

  const setLang = useCallback((code) => {
    setLangState(code)
    try {
      localStorage.setItem(STORAGE_KEY, code)
    } catch (_) {}
  }, [])

  const t = useCallback(
    (key) => {
      const v = getTranslation(lang, key)
      return v !== undefined && v !== null ? v : key
    },
    [lang]
  )

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
