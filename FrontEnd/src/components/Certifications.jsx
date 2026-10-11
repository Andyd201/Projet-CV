import Section from './Section'
import { useLanguage } from '../i18n/LanguageContext'

function Certifications() {
  const { t } = useLanguage()
  return (
    <Section title={t.labels.certifications}>
      {t.certifications.map((cert) => (
        <article key={cert.name} className="cert-entry">
          <h3>{cert.name}</h3>
          <p className="cert-issuer">{cert.issuer}</p>
          <p className="cert-meta">
            {cert.date} ·{' '}
            <a href={cert.url} target="_blank" rel="noopener noreferrer">
              {t.labels.verify} ↗
            </a>
          </p>
        </article>
      ))}
    </Section>
  )
}

export default Certifications
