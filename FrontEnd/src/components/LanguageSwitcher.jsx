import { useLanguage } from '../i18n/LanguageContext'

const NEXT_LANG = { fr: 'en', en: 'fr' }
const LABEL = { fr: 'FR', en: 'EN' }

function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()
  const next = NEXT_LANG[lang]

  return (
    <button
      type="button"
      className="lang-switch no-print"
      onClick={() => setLang(next)}
      aria-label={`Switch to ${LABEL[next]}`}
    >
      {LABEL[next]}
    </button>
  )
}

export default LanguageSwitcher
