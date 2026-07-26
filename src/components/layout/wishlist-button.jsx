function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M12 20.7s-7-4.4-9.2-8.2A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.2 6.5C19 16.3 12 20.7 12 20.7Z" />
    </svg>
  )
}

export function WishlistButton({ count, label, onClick, className = '' }) {
  return (
    <button
      type="button"
      className={`wishlist-button ${className}`.trim()}
      aria-label={`${label}: ${count}`}
      onClick={onClick}
    >
      <HeartIcon />
      <span className="wishlist-button__label">{label}</span>
      <span className="wishlist-button__badge" aria-hidden="true">
        {count > 99 ? '99+' : count}
      </span>
    </button>
  )
}
