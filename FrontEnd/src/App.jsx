import './App.css'
import Header from './components/Header'
import ContactInfo from './components/ContactInfo'
import Summary from './components/Summary'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Languages from './components/Languages'
import ContactForm from './components/ContactForm'
import Section from './components/Section'
import { useLanguage } from './i18n/LanguageContext'

function App() {
  const { t } = useLanguage()

  return (
    <div className="cv-page">
      <Header />
      <div className="cv-body">
        <aside className="cv-sidebar">
          <Section title={t.labels.contactInfo}>
            <ContactInfo />
          </Section>
          <Skills />
          <Languages />
          <Education />
        </aside>
        <main className="cv-main">
          <Summary />
          <Experience />
          <ContactForm />
        </main>
      </div>
    </div>
  )
}

export default App
