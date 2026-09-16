import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { content, profile } from '../data/cv'

const LanguageContext = createContext(null)

function getInitialLang() {
  try {
    const saved = localStorage.getItem('cv-lang')
    if (saved === 'fr' || saved === 'en') return saved
  } catch {
    /* localStorage unavailable, fall back below */
  }
  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    try {
      localStorage.setItem('cv-lang', lang)
    } catch {
      /* ignore persistence failures (private mode, etc.) */
    }
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(
    () => ({ lang, setLang, t: content[lang], profile }),
    [lang],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
