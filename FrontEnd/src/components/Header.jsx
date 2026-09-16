import { profile } from '../data/cv'

function Header() {
  return (
    <header className="cv-header">
      <div>
        <h1>{profile.name}</h1>
        <p className="title">{profile.title}</p>
      </div>
      <ul className="contact-list">
        <li>{profile.location}</li>
        <li>
          <a href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`}>
            {profile.phone}
          </a>
        </li>
        <li>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </li>
        <li>
          <a
            href={`https://${profile.website}`}
            target="_blank"
            rel="noreferrer"
          >
            {profile.website}
          </a>
        </li>
      </ul>
      <button
        type="button"
        className="print-button no-print"
        onClick={() => window.print()}
      >
        Imprimer / Enregistrer en PDF
      </button>
    </header>
  )
}

export default Header
