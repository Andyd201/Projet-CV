require('dotenv').config()

const path = require('node:path')
const express = require('express')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const { Resend } = require('resend')

const app = express()
const PORT = process.env.PORT || 3001
const IS_PROD = process.env.NODE_ENV === 'production'
const FRONTEND_DIST = path.join(__dirname, '..', 'FrontEnd', 'dist')

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'andydouang@gmail.com'
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Limites de taille des champs du formulaire
const LIMITS = { name: 100, email: 254, message: 5000 }
const EMAIL_RE = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]{2,}$/

// [FIX] Ne pas révéler qu'on utilise Express (en-tête X-Powered-By)
app.disable('x-powered-by')

// [FIX] Derrière un reverse proxy (Nginx, Cloudflare, Render...), mettre TRUST_PROXY=1
// pour que le rate-limit voie la vraie IP du visiteur et pas celle du proxy.
if (process.env.TRUST_PROXY) {
  app.set('trust proxy', Number(process.env.TRUST_PROXY) || process.env.TRUST_PROXY)
}

// [FIX] En-têtes de sécurité : CSP, anti-clickjacking, nosniff, HSTS, etc.
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
      },
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  }),
)

// [FIX] Limite la taille du corps JSON (défaut 100 kb -> 10 kb)
app.use(express.json({ limit: '10kb' }))

// [FIX] Anti-spam : max 5 messages / 15 min par IP sur le formulaire
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many messages, please try again later.' },
})

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]))
}

// Retire les caractères de contrôle (dont \r \n) pour éviter l'injection d'en-têtes
function stripControlChars(str) {
  return str.replace(/[\u0000-\u001F\u007F]/g, ' ').trim()
}

// [FIX] Validation stricte des entrées (type, longueur, format du courriel)
function validateContact(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { error: 'Invalid body' }
  const { name, email, message, website } = body

  // Honeypot : champ caché que seuls les bots remplissent
  if (typeof website === 'string' && website.trim() !== '') return { bot: true }

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return { error: 'name, email and message are required' }
  }

  const clean = {
    name: stripControlChars(name),
    email: stripControlChars(email).toLowerCase(),
    message: message.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, '').trim(),
  }

  if (!clean.name || !clean.email || !clean.message) {
    return { error: 'name, email and message are required' }
  }
  for (const key of Object.keys(LIMITS)) {
    if (clean[key].length > LIMITS[key]) return { error: `${key} is too long` }
  }
  if (!EMAIL_RE.test(clean.email)) return { error: 'Invalid email address' }

  return { data: clean }
}

app.post('/api/contact', contactLimiter, async (req, res) => {
  const result = validateContact(req.body)
  if (result.bot) return res.status(200).json({ ok: true }) // on fait semblant que ça a marché
  if (result.error) return res.status(400).json({ error: result.error })
  const { name, email, message } = result.data

  if (!resend) {
    console.warn('RESEND_API_KEY not set — message not sent.')
    // [FIX] Ne pas écrire les données personnelles des visiteurs dans les logs en production
    if (!IS_PROD) console.log('New contact message:', { name, email, message })
    return res.status(IS_PROD ? 503 : 200).json(IS_PROD ? { error: 'Contact form unavailable' } : { ok: true })
  }

  try {
    const { error } = await resend.emails.send({
      from: `CV Contact Form <${CONTACT_FROM_EMAIL}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Nouveau message de ${name.slice(0, 80)} (via le CV)`,
      text: `Nom : ${name}\nCourriel : ${email}\n\nMessage :\n${message}`,
      html: `
        <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
        <p><strong>Courriel :</strong> ${escapeHtml(email)}</p>
        <p><strong>Message :</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    })
    if (error) throw error
    res.status(200).json({ ok: true })
  } catch (err) {
    // [FIX] On log seulement le message d'erreur, pas l'objet complet (peut contenir la config/clé)
    console.error('Failed to send contact email:', err?.message || err)
    res.status(502).json({ error: 'Failed to send message' })
  }
})

// [FIX] Les routes /api inconnues renvoient un 404 JSON propre
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }))

// Serve the built frontend in production (run `npm run build` in FrontEnd/ first).
app.use(express.static(FRONTEND_DIST, { index: false, dotfiles: 'ignore' }))
app.get(/.*/, (req, res, next) => {
  res.sendFile(path.join(FRONTEND_DIST, 'index.html'), (err) => {
    if (err) next()
  })
})

// [FIX] Gestionnaire d'erreurs : jamais de stack trace envoyée au client
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500
  if (status >= 500) console.error(err)
  const msg =
    err.type === 'entity.too.large' ? 'Payload too large'
    : err.type === 'entity.parse.failed' ? 'Invalid JSON'
    : status >= 500 ? 'Internal server error'
    : 'Bad request'
  res.status(status).json({ error: msg })
})

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`)
})
