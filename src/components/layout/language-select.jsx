import { LANGUAGES } from '../../state/app-preferences.js'

export function LanguageSelect({ label, value, onChange, className = '' }) {
  return (
    <div
      className={`language-toggle ${className}`.trim()}
      role="group"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
      <button
        type="button"
        className={`language-toggle__option ${
          value === LANGUAGES.ENGLISH ? 'language-toggle__option--active' : ''
        }`.trim()}
        onClick={() => onChange(LANGUAGES.ENGLISH)}
        aria-pressed={value === LANGUAGES.ENGLISH}
      >
        ENG
      </button>
      <button
        type="button"
        className={`language-toggle__option ${
          value === LANGUAGES.GEORGIAN ? 'language-toggle__option--active' : ''
        }`.trim()}
        onClick={() => onChange(LANGUAGES.GEORGIAN)}
        aria-pressed={value === LANGUAGES.GEORGIAN}
      >
        GEO
      </button>
    </div>
  )
}
