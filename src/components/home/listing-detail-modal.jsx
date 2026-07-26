import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { siteCopy } from '../../content/site-copy.js'
import { useAppPreferences } from '../../state/app-preferences.js'
import { getLocalizedValue } from '../../utils/get-localized-value.js'

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 20.7s-7-4.4-9.2-8.2A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.2 6.5C19 16.3 12 20.7 12 20.7Z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14 5h5v5M10 14l9-9M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4" />
    </svg>
  )
}

function ArrowIcon({ direction }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      {direction === 'left' ? (
        <path d="M15 5l-7 7l7 7" />
      ) : (
        <path d="M9 5l7 7l-7 7" />
      )}
    </svg>
  )
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" />
    </svg>
  )
}

function getNextImageIndex(currentIndex, direction, imageCount) {
  if (currentIndex === null || imageCount === 0) {
    return currentIndex
  }

  return (currentIndex + direction + imageCount) % imageCount
}

export function ListingDetailModal({ item, language, onClose }) {
  const { isInWishlist, toggleWishlist } = useAppPreferences()
  const copy = siteCopy[language].listingDetails
  const title = getLocalizedValue(item.title, language)
  const description = getLocalizedValue(item.description, language)
  const city = getLocalizedValue(item.city, language)
  const categoryName = item.categoryName[language]
  const isSaved = isInWishlist(item.id)
  const isPhotographer = item.categoryId === 'photographers'
  const supportsLinks = [
    'bands',
    'djs',
    'photographers',
    'videographers',
  ].includes(item.categoryId)
  const galleryImages = isPhotographer ? item.photos.filter(Boolean) : []
  const viewerImages = isPhotographer
    ? [item.imageUrl, ...galleryImages].filter(Boolean)
    : [item.imageUrl].filter(Boolean)
  const profileImageOffset = item.imageUrl ? 1 : 0
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [expandedImageIndex, setExpandedImageIndex] = useState(null)
  const selectedImage = viewerImages[selectedImageIndex] || ''

  function moveExpandedImage(direction) {
    setExpandedImageIndex((currentIndex) =>
      getNextImageIndex(currentIndex, direction, viewerImages.length),
    )
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        if (expandedImageIndex !== null) {
          setExpandedImageIndex(null)
        } else {
          onClose()
        }
      }

      if (expandedImageIndex !== null && event.key === 'ArrowLeft') {
        setExpandedImageIndex((currentIndex) =>
          getNextImageIndex(currentIndex, -1, viewerImages.length),
        )
      }

      if (expandedImageIndex !== null && event.key === 'ArrowRight') {
        setExpandedImageIndex((currentIndex) =>
          getNextImageIndex(currentIndex, 1, viewerImages.length),
        )
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [expandedImageIndex, onClose, viewerImages.length])

  return createPortal(
    <div className="listing-detail-modal" role="presentation" onMouseDown={onClose}>
      <section
        className="listing-detail-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`listing-detail-title-${item.id}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="listing-detail-modal__close"
          aria-label={copy.close}
          onClick={onClose}
          autoFocus
        >
          <CloseIcon />
        </button>

        <div className="listing-detail-modal__media">
          {selectedImage ? (
            isPhotographer ? (
              <button
                type="button"
                className="listing-detail-modal__expand"
                aria-label={copy.expandImage}
                onClick={() => setExpandedImageIndex(selectedImageIndex)}
              >
                <img src={selectedImage} alt={title} />
                <span aria-hidden="true">
                  <ExpandIcon />
                </span>
              </button>
            ) : (
              <img src={selectedImage} alt={title} />
            )
          ) : (
            <span>{title.charAt(0)}</span>
          )}
        </div>

        <div className="listing-detail-modal__content">
          <p className="listing-detail-modal__eyebrow">{categoryName}</p>
          <h2 id={`listing-detail-title-${item.id}`}>{title}</h2>

          {city ? (
            <p className="listing-detail-modal__city">
              <span>{copy.city}</span>
              <strong>{city}</strong>
            </p>
          ) : null}

          <div className="listing-detail-modal__description">
            <h3>{copy.about}</h3>
            <p>{description || copy.descriptionFallback}</p>
          </div>

          <button
            type="button"
            className={`listing-detail-modal__wishlist ${
              isSaved ? 'listing-detail-modal__wishlist--active' : ''
            }`.trim()}
            onClick={() => toggleWishlist(item)}
          >
            <HeartIcon />
            <span>{isSaved ? copy.saved : copy.save}</span>
          </button>

          {supportsLinks && item.links.length > 0 ? (
            <div className="listing-detail-modal__links">
              {item.links.map((link, index) => (
                <a key={link} href={link} target="_blank" rel="noreferrer">
                  <span>
                    {copy.link
                      .replace(
                        '{number}',
                        item.links.length > 1 ? `${index + 1}` : '',
                      )
                      .trim()}
                  </span>
                  <ExternalIcon />
                </a>
              ))}
            </div>
          ) : null}
        </div>

        {isPhotographer && galleryImages.length > 0 ? (
          <div className="listing-detail-modal__gallery">
            <p>{copy.gallery}</p>
            <div>
              {galleryImages.map((imageUrl, index) => {
                const viewerIndex = index + profileImageOffset

                return (
                  <button
                    type="button"
                    key={`${imageUrl}-${index}`}
                    className={
                      selectedImageIndex === viewerIndex
                        ? 'listing-detail-modal__gallery-item--active'
                        : ''
                    }
                    aria-label={copy.openImage.replace('{number}', index + 1)}
                    onClick={() => {
                      setSelectedImageIndex(viewerIndex)
                      setExpandedImageIndex(viewerIndex)
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt={`${title} ${index + 1}`}
                      loading="lazy"
                    />
                  </button>
                )
              })}
            </div>
          </div>
        ) : null}
      </section>

      {expandedImageIndex !== null ? (
        <div
          className="photographer-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={copy.gallery}
          onMouseDown={(event) => {
            event.stopPropagation()
            setExpandedImageIndex(null)
          }}
        >
          <div
            className="photographer-lightbox__content"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="photographer-lightbox__close"
              aria-label={copy.closeGallery}
              onClick={() => setExpandedImageIndex(null)}
            >
              <CloseIcon />
            </button>

            {viewerImages.length > 1 ? (
              <button
                type="button"
                className="photographer-lightbox__arrow photographer-lightbox__arrow--left"
                aria-label={copy.previousPhoto}
                onClick={() => moveExpandedImage(-1)}
              >
                <ArrowIcon direction="left" />
              </button>
            ) : null}

            <figure>
              <img
                src={viewerImages[expandedImageIndex]}
                alt={`${title} ${expandedImageIndex + 1}`}
              />
              <figcaption>
                <span>{title}</span>
                <span>
                  {expandedImageIndex + 1} / {viewerImages.length}
                </span>
              </figcaption>
            </figure>

            {viewerImages.length > 1 ? (
              <button
                type="button"
                className="photographer-lightbox__arrow photographer-lightbox__arrow--right"
                aria-label={copy.nextPhoto}
                onClick={() => moveExpandedImage(1)}
              >
                <ArrowIcon direction="right" />
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>,
    document.body,
  )
}
