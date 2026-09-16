import Section from './Section'
import { skills } from '../data/cv'

function Skills() {
  return (
    <Section title="Compétences">
      <div className="skills-grid">
        {skills.map((group) => (
          <div key={group.category} className="skills-group">
            <h3>{group.category}</h3>
            <p>{group.items.join(' · ')}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Skills
