import Section from './Section'
import { useLanguage } from '../i18n/LanguageContext'

function Languages() {
  const { t } = useLanguage()
  return (
    <Section title={t.labels.languages}>
      <ul className="tag-list">
        {t.languages.map((lang) => (
          <li key={lang.name}>
            {lang.name} <span className="muted">— {lang.level}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default Languages
