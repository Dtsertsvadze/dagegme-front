import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppPreferences } from '../../state/app-preferences.js'
import { getLocalizedValue } from '../../utils/get-localized-value.js'
import { ListingDetailModal } from './listing-detail-modal.jsx'

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20.7s-7-4.4-9.2-8.2A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.2 6.5C19 16.3 12 20.7 12 20.7Z" />
    </svg>
  )
}

function DetailsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2.5 12s3.5-5.5 9.5-5.5s9.5 5.5 9.5 5.5s-3.5 5.5-9.5 5.5S2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  )
}

export function ListingCard({ item, language }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const { isInWishlist, toggleWishlist } = useAppPreferences()
  const categoryName = item.categoryName[language]
  const itemTitle = getLocalizedValue(item.title, language)
  const itemDescription = getLocalizedValue(item.description, language)
  const isSaved = isInWishlist(item.id)
  const actionLabel = language === 'ka' ? 'ნახვა' : 'View'
  const wishlistLabel =
    language === 'ka'
      ? isSaved
        ? 'სურვილების სიიდან წაშლა'
        : 'სურვილების სიაში დამატება'
      : isSaved
        ? 'Remove from wishlist'
        : 'Add to wishlist'
  const fallbackDescription =
    language === 'ka'
      ? 'დეტალები მალე დაემატება.'
      : 'More details will be added soon.'

  return (
    <article className="listing-card">
      <div className="listing-card__media">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={itemTitle} loading="lazy" />
        ) : (
          <div className="listing-card__placeholder">{itemTitle.charAt(0)}</div>
        )}

        <button
          type="button"
          className={`listing-card__favorite ${
            isSaved ? 'listing-card__favorite--active' : ''
          }`.trim()}
          aria-label={wishlistLabel}
          aria-pressed={isSaved}
          onClick={() => toggleWishlist(item)}
        >
          <HeartIcon />
        </button>
      </div>

      <div className="listing-card__body">
        <h3 className="listing-card__title">{itemTitle}</h3>
        <p className="listing-card__meta">{categoryName}</p>
        <p className="listing-card__description">
          {itemDescription || fallbackDescription}
        </p>

        {item.detailsHref ? (
          <Link className="listing-card__action" to={item.detailsHref}>
            <span>{actionLabel}</span>
            <DetailsIcon />
          </Link>
        ) : (
          <button
            type="button"
            className="listing-card__action"
            onClick={() => setIsDetailsOpen(true)}
          >
            <span>{actionLabel}</span>
            <DetailsIcon />
          </button>
        )}
      </div>

      {isDetailsOpen ? (
        <ListingDetailModal
          item={item}
          language={language}
          onClose={() => setIsDetailsOpen(false)}
        />
      ) : null}
    </article>
  )
}
