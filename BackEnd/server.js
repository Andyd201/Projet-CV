require('dotenv').config()

const path = require('node:path')
const express = require('express')
const { Resend } = require('resend')

const app = express()
const PORT = process.env.PORT || 3001
const FRONTEND_DIST = path.join(__dirname, '..', 'FrontEnd', 'dist')

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'andydouang@gmail.com'
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]))
}

app.use(express.json())

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email and message are required' })
  }

  if (!resend) {
    console.warn('RESEND_API_KEY not set — logging message instead of sending email.')
    console.log('New contact message:', { name, email, message })
    return res.status(200).json({ ok: true })
  }

  try {
    await resend.emails.send({
      from: `CV Contact Form <${CONTACT_FROM_EMAIL}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Nouveau message de ${name} (via le CV)`,
      html: `
        <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
        <p><strong>Courriel :</strong> ${escapeHtml(email)}</p>
        <p><strong>Message :</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    })
    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Failed to send contact email:', err)
    res.status(502).json({ error: 'Failed to send message' })
  }
})

// Serve the built frontend in production (run `npm run build` in FrontEnd/ first).
app.use(express.static(FRONTEND_DIST))
app.get(/.*/, (req, res, next) => {
  if (req.path.startsWith('/api')) return next()
  res.sendFile(path.join(FRONTEND_DIST, 'index.html'), (err) => {
    if (err) next()
  })
})

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`)
})
