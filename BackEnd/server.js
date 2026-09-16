const path = require('node:path')
const express = require('express')

const app = express()
const PORT = process.env.PORT || 3001
const FRONTEND_DIST = path.join(__dirname, '..', 'FrontEnd', 'dist')

app.use(express.json())

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email and message are required' })
  }

  // TODO: send an email / store the message somewhere durable.
  console.log('New contact message:', { name, email, message })

  res.status(200).json({ ok: true })
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
