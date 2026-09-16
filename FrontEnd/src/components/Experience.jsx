import Section from './Section'
import { experience } from '../data/cv'

function Experience() {
  return (
    <Section title="Expérience">
      {experience.map((job) => (
        <article key={`${job.company}-${job.period}`} className="job">
          <div className="job-heading">
            <h3>
              {job.company} — {job.role}
            </h3>
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
    </Section>
  )
}

export default Experience
