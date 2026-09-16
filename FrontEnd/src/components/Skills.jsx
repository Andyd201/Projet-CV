import Section from './Section'
import { useLanguage } from '../i18n/LanguageContext'

function Skills() {
  const { t } = useLanguage()
  return (
    <Section title={t.labels.skills}>
      <div className="skills-list">
        {t.skills.map((group) => (
          <div key={group.category} className="skills-group">
            <h3>{group.category}</h3>
            <ul className="tag-list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Skills
