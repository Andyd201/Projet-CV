import Section from './Section'
import { useLanguage } from '../i18n/LanguageContext'

function Experience() {
  const { t } = useLanguage()
  return (
    <Section title={t.labels.experience}>
      <div className="timeline">
        {t.experience.map((job) => (
          <article key={`${job.company}-${job.period}`} className="job">
            <div className="job-heading">
              <div>
                <h3>{job.role}</h3>
                <p className="job-company">{job.company}</p>
              </div>
              <span className="period">{job.period}</span>
            </div>
            {job.location && <p className="job-location">{job.location}</p>}
            <ul>
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}

export default Experience
