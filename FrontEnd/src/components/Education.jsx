import Section from './Section'
import { education } from '../data/cv'

function Education() {
  return (
    <Section title="Formation">
      {education.map((entry) => (
        <article key={entry.school} className="education-entry">
          <div className="job-heading">
            <h3>{entry.school}</h3>
            <span className="period">{entry.period}</span>
          </div>
          <p className="job-location">
            {entry.program}
            {entry.location ? ` — ${entry.location}` : ''}
          </p>
        </article>
      ))}
    </Section>
  )
}

export default Education
