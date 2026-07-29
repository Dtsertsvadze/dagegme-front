import { siteCopy } from '../../content/site-copy.js'
import { useAppPreferences } from '../../state/app-preferences.js'
import { SiteBrand } from './site-brand.jsx'

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 12h14M14 7l5 5l-5 5" />
    </svg>
  )
}

export function SiteFooter() {
  const { language } = useAppPreferences()
  const copy = siteCopy[language]
  const year = new Date().getFullYear()

  return (
    <footer id="site-footer" className="site-footer">
      <div className="site-footer__main">
        <div className="site-footer__brand">
          <SiteBrand label={copy.brand} />
          <p>{copy.footer.tagline}</p>
        </div>

        <nav className="site-footer__navigation" aria-label={copy.footer.navigationLabel}>
          <p className="site-footer__label">{copy.footer.navigationLabel}</p>
          {copy.footer.links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-footer__callout">
          <span className="site-footer__spark" aria-hidden="true">✦</span>
          <h2>{copy.footer.calloutTitle}</h2>
          <p>{copy.footer.calloutText}</p>
          <a href="/#categories">
            <span>{copy.footer.calloutAction}</span>
            <ArrowIcon />
          </a>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© {year} dagegme.com</p>
        <p>{copy.footer.note}</p>
      </div>
    </footer>
  )
}
