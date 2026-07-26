import { useEffect } from 'react'
import { useAppPreferences } from '../../state/app-preferences.js'
import { getLocalizedValue } from '../../utils/get-localized-value.js'

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function WishlistModal({ copy, isOpen, onClose }) {
  const { language, wishlist, removeFromWishlist } = useAppPreferences()

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div className="wishlist-modal" role="presentation" onMouseDown={onClose}>
      <section
        className="wishlist-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wishlist-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="wishlist-modal__header">
          <div>
            <h2 id="wishlist-title">{copy.wishlistTitle}</h2>
            <span className="wishlist-modal__count">{wishlist.length}</span>
          </div>
          <button
            type="button"
            className="wishlist-modal__close"
            aria-label={copy.close}
            onClick={onClose}
            autoFocus
          >
            <CloseIcon />
          </button>
        </header>

        {wishlist.length === 0 ? (
          <p className="wishlist-modal__empty">{copy.wishlistEmpty}</p>
        ) : (
          <div className="wishlist-modal__list">
            {wishlist.map((item) => (
              <WishlistItem
                key={item.id}
                item={item}
                language={language}
                copy={copy}
                onRemove={removeFromWishlist}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function WishlistItem({ item, language, copy, onRemove }) {
  const title = getLocalizedValue(item.title, language)
  const description = getLocalizedValue(item.description, language)

  return (
    <article className="wishlist-item">
      <div className="wishlist-item__media">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={title} />
        ) : (
          <span>{title.charAt(0)}</span>
        )}
      </div>
      <div className="wishlist-item__content">
        <p className="wishlist-item__category">
          {item.categoryName?.[language] || ''}
        </p>
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
        <div className="wishlist-item__actions">
          <button type="button" onClick={() => onRemove(item.id)}>
            {copy.removeFromWishlist}
          </button>
          {item.href ? (
            <a href={item.href} target="_blank" rel="noreferrer">
              {copy.viewListing}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}
