import { useLanguage } from '../i18n/LanguageContext'

const OPTIONS = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
]

function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="lang-switch no-print" role="group" aria-label="Language">
      {OPTIONS.map((option) => (
        <button
          key={option.code}
          type="button"
          className={option.code === lang ? 'active' : ''}
          aria-pressed={option.code === lang}
          onClick={() => setLang(option.code)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
