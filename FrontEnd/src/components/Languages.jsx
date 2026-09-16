import Section from './Section'
import { languages } from '../data/cv'

function Languages() {
  return (
    <Section title="Langues">
      <p>
        {languages.map((lang) => `${lang.name} (${lang.level})`).join(' · ')}
      </p>
    </Section>
  )
}

export default Languages
