import Section from './Section'
import { useLanguage } from '../i18n/LanguageContext'

function Summary() {
  const { t } = useLanguage()
  return (
    <Section title={t.labels.summary}>
      <p className="summary-text">{t.summary}</p>
    </Section>
  )
}

export default Summary
