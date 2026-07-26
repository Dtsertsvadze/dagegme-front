import { useState } from 'react'
import { siteCopy } from '../../content/site-copy.js'
import { THEMES, useAppPreferences } from '../../state/app-preferences.js'
import { LanguageSelect } from './language-select.jsx'
import { SiteBrand } from './site-brand.jsx'
import { SiteNav } from './site-nav.jsx'
import { ThemeToggle } from './theme-toggle.jsx'
import { WishlistButton } from './wishlist-button.jsx'
import { WishlistModal } from './wishlist-modal.jsx'

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const { language, setLanguage, theme, toggleTheme, wishlist } = useAppPreferences()
  const copy = siteCopy[language]
  const isDarkTheme = theme === THEMES.DARK

  function handleLanguageChange(nextLanguage) {
    setLanguage(nextLanguage)
    setIsMenuOpen(false)
  }

  function handleMenuToggle() {
    setIsMenuOpen((currentValue) => !currentValue)
  }

  return (
    <header className="site-header">
      <SiteBrand label={copy.brand} />

      <button
        type="button"
        className="menu-toggle"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        onClick={handleMenuToggle}
      >
        <span className="menu-toggle__line"></span>
        <span className="menu-toggle__line"></span>
        <span className="menu-toggle__line"></span>
      </button>

      <SiteNav items={copy.nav} />

      <div className="site-controls site-controls--desktop">
          <LanguageSelect
            label={copy.languageLabel}
            value={language}
            onChange={handleLanguageChange}
          />
        <ThemeToggle
          label={copy.themeLabel}
          pressed={isDarkTheme}
          activeLabel={isDarkTheme ? copy.dark : copy.light}
          onToggle={toggleTheme}
        />
        <WishlistButton
          count={wishlist.length}
          label={copy.wishlist}
          onClick={() => setIsWishlistOpen(true)}
        />
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-menu ${isMenuOpen ? 'mobile-menu--open' : ''}`.trim()}
      >
        <nav className="mobile-menu__nav" aria-label="Mobile Primary">
          {copy.nav.map((item) => (
            <a
              key={item.href}
              className="mobile-menu__link"
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mobile-menu__controls">
          <LanguageSelect
            className="mobile-menu__language"
            label={copy.languageLabel}
            value={language}
            onChange={handleLanguageChange}
          />
          <ThemeToggle
            className="mobile-menu__theme"
            label={copy.themeLabel}
            pressed={isDarkTheme}
            activeLabel={isDarkTheme ? copy.dark : copy.light}
            onToggle={toggleTheme}
          />
          <WishlistButton
            className="mobile-menu__wishlist"
            count={wishlist.length}
            label={copy.wishlist}
            onClick={() => {
              setIsMenuOpen(false)
              setIsWishlistOpen(true)
            }}
          />
        </div>
      </div>

      <WishlistModal
        copy={copy}
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
    </header>
  )
}
