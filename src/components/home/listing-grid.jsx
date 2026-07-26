import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ListingCard } from './listing-card.jsx'

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

export function ListingGrid({
  items,
  title: titleOverride,
  className = '',
  seeAllHref = '',
  activeCategory,
  onClearFilter,
  isLoading,
  error,
  language,
}) {
  const title =
    titleOverride ||
    (language === 'ka' ? 'პროფესიონალები' : 'Professionals')
  const clearLabel = language === 'ka' ? 'ყველას ნახვა' : 'View all'
  const loadingLabel = language === 'ka' ? 'იტვირთება...' : 'Loading...'
  const emptyLabel =
    language === 'ka'
      ? 'ამ კატეგორიაში ჩანაწერები ჯერ არ არის.'
      : 'There are no listings in this category yet.'
  const carouselRef = useRef(null)
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
  })
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(items.length > 1)

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'auto' })
    }
  }, [items])

  useEffect(() => {
    const carousel = carouselRef.current

    if (!carousel) {
      return undefined
    }

    function syncScrollState() {
      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth

      setCanScrollLeft(carousel.scrollLeft > 4)
      setCanScrollRight(maxScrollLeft - carousel.scrollLeft > 4)
    }

    syncScrollState()

    window.addEventListener('resize', syncScrollState)

    return () => window.removeEventListener('resize', syncScrollState)
  }, [items])

  function updateActiveIndex() {
    const carousel = carouselRef.current

    if (!carousel) {
      return
    }

    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth

    setCanScrollLeft(carousel.scrollLeft > 4)
    setCanScrollRight(maxScrollLeft - carousel.scrollLeft > 4)
  }

  function handlePointerDown(event) {
    const carousel = carouselRef.current
    const isInteractiveTarget = event.target.closest('button, a')

    if (
      !carousel ||
      event.pointerType === 'touch' ||
      event.button !== 0 ||
      isInteractiveTarget
    ) {
      return
    }

    dragStateRef.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: carousel.scrollLeft,
    }

    carousel.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event) {
    const carousel = carouselRef.current
    const dragState = dragStateRef.current

    if (!carousel || !dragState.isDragging || event.pointerType === 'touch') {
      return
    }

    const distance = event.clientX - dragState.startX
    carousel.scrollLeft = dragState.scrollLeft - distance
    updateActiveIndex()
  }

  function stopDragging(event) {
    const carousel = carouselRef.current

    dragStateRef.current.isDragging = false

    if (carousel?.hasPointerCapture(event.pointerId)) {
      carousel.releasePointerCapture(event.pointerId)
    }
  }

  function scrollCarousel(direction) {
    const carousel = carouselRef.current

    if (!carousel) {
      return
    }

    const firstCard = carousel.querySelector('.listing-card')
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 220
    const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap) || 0
    const offset = cardWidth + gap

    carousel.scrollBy({
      left: direction === 'left' ? -offset : offset,
      behavior: 'smooth',
    })
  }

  return (
    <section className={`home-section ${className}`.trim()}>
      <div className="section-heading">
        <h2 className="section-heading__title">{title}</h2>
        {seeAllHref ? (
          <Link className="section-heading__action" to={seeAllHref}>
            {clearLabel}
          </Link>
        ) : activeCategory ? (
          <button
            type="button"
            className="section-heading__action"
            onClick={onClearFilter}
          >
            {clearLabel}
          </button>
        ) : null}
      </div>

      {isLoading ? <div className="feedback-card">{loadingLabel}</div> : null}
      {!isLoading && error ? <div className="feedback-card">{error}</div> : null}
      {!isLoading && !error && items.length === 0 ? (
        <div className="feedback-card">{emptyLabel}</div>
      ) : null}

      {!isLoading && !error && items.length > 0 ? (
        <div className="listing-carousel__frame">
          <button
            type="button"
            className="carousel-arrow carousel-arrow--side carousel-arrow--left"
            onClick={() => scrollCarousel('left')}
            disabled={!canScrollLeft}
            aria-label={language === 'ka' ? 'წინა' : 'Previous'}
          >
            <ArrowIcon direction="left" />
          </button>
          <div
            ref={carouselRef}
            className="listing-carousel"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
            onScroll={updateActiveIndex}
          >
            {items.map((item) => (
              <ListingCard key={item.id} item={item} language={language} />
            ))}
          </div>
          <button
            type="button"
            className="carousel-arrow carousel-arrow--side carousel-arrow--right"
            onClick={() => scrollCarousel('right')}
            disabled={!canScrollRight}
            aria-label={language === 'ka' ? 'შემდეგი' : 'Next'}
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      ) : null}
    </section>
  )
}
