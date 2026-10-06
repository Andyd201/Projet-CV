import { useState } from 'react'
import Section from './Section'
import { useLanguage } from '../i18n/LanguageContext'

const initialForm = { name: '', email: '', message: '', website: '' }

function ContactForm() {
  const { t } = useLanguage()
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
    <Section title={t.labels.contact}>
      <form className="contact-form no-print" onSubmit={handleSubmit}>
        <label htmlFor="name">{t.labels.name}</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
        />

        <label htmlFor="email">{t.labels.email}</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
        />

        <label htmlFor="message">{t.labels.message}</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          maxLength={5000}
          value={form.message}
          onChange={handleChange}
        />

        {/* Honeypot anti-bot : invisible pour les humains, laissé vide */}
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hp-field"
        />

        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? t.labels.sending : t.labels.send}
        </button>

        {status === 'sent' && <p className="form-status ok">{t.labels.sent}</p>}
        {status === 'error' && (
          <p className="form-status error">{t.labels.error}</p>
        )}
      </form>
    </Section>
  )
}

export default ContactForm
