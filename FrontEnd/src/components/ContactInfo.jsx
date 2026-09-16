import { useLanguage } from '../i18n/LanguageContext'
import { PhoneIcon, MailIcon, PinIcon, GlobeIcon } from './icons'

function ContactInfo() {
  const { profile } = useLanguage()

  return (
    <ul className="contact-list">
      <li>
        <PinIcon />
        <span>{profile.location}</span>
      </li>
      <li>
        <PhoneIcon />
        <a href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`}>
          {profile.phone}
        </a>
      </li>
      <li>
        <MailIcon />
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </li>
      <li>
        <GlobeIcon />
        <a href={`https://${profile.website}`} target="_blank" rel="noreferrer">
          {profile.website}
        </a>
      </li>
    </ul>
  )
}

export default ContactInfo
