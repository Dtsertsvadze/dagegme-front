export function ThemeToggle({
  label,
  pressed,
  activeLabel,
  onToggle,
  className = '',
}) {
  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      onClick={onToggle}
      aria-label={label}
      aria-pressed={pressed}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {pressed ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M20 15.2A8 8 0 0 1 8.8 4a8 8 0 1 0 11.2 11.2Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="3.5" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        )}
      </span>
      <span className="theme-toggle__track">
        <span className="theme-toggle__thumb"></span>
      </span>
      <span className="theme-toggle__label">{activeLabel}</span>
    </button>
  )
}
