import { useState } from 'react'
import Section from './Section'

const initialForm = { name: '', email: '', message: '' }

function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!response.ok) throw new Error('Request failed')
      setForm(initialForm)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section title="Me contacter">
      <form className="contact-form no-print" onSubmit={handleSubmit}>
        <label htmlFor="name">Nom</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Courriel</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={form.message}
          onChange={handleChange}
        />

        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Envoi…' : 'Envoyer'}
        </button>

        {status === 'sent' && <p className="form-status ok">Message envoyé, merci !</p>}
        {status === 'error' && (
          <p className="form-status error">
            Une erreur est survenue, réessayez plus tard.
          </p>
        )}
      </form>
    </Section>
  )
}

export default ContactForm
