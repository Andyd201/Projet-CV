import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

function Header() {
  const { t, profile } = useLanguage()

  return (
    <header className="cv-header">
      <div className="cv-header-identity">
        <div className="avatar" aria-hidden="true">
          {profile.initials}
        </div>
        <div>
          <h1>{profile.name}</h1>
          <p className="title">{t.title}</p>
        </div>
      </div>
      <div className="cv-header-actions">
        <LanguageSwitcher />
        <button
          type="button"
          className="print-button no-print"
          onClick={() => window.print()}
        >
          {t.labels.print}
        </button>
      </div>
    </header>
  )
}

export default Header
