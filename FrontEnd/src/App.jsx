import './App.css'
import Header from './components/Header'
import Summary from './components/Summary'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Languages from './components/Languages'
import ContactForm from './components/ContactForm'

function App() {
  return (
    <div className="cv-page">
      <Header />
      <main>
        <Summary />
        <Skills />
        <Experience />
        <Education />
        <Languages />
        <ContactForm />
      </main>
    </div>
  )
}

export default App
