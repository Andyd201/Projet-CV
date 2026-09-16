import Section from './Section'
import { summary } from '../data/cv'

function Summary() {
  return (
    <Section title="Résumé">
      <p>{summary}</p>
    </Section>
  )
}

export default Summary
