import Section from './Section'
import { useLanguage } from '../i18n/LanguageContext'

function Education() {
  const { t } = useLanguage()
  return (
    <Section title={t.labels.education}>
      {t.education.map((entry) => (
        <article key={entry.school} className="education-entry">
          <h3>{entry.school}</h3>
          <p className="job-location">{entry.program}</p>
          <p className="period">{entry.period}</p>
        </article>
      ))}
    </Section>
  )
}

export default Education
