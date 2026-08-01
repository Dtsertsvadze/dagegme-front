import { ListingGrid } from '../components/home/listing-grid.jsx'
import { siteCopy } from '../content/site-copy.js'
import { useHomeListings } from '../hooks/use-home-listings.js'
import { useAppPreferences } from '../state/app-preferences.js'
import { sortListingsVipFirst } from '../utils/sort-listings-vip-first.js'

export function ProfessionalsPage() {
  const { language } = useAppPreferences()
  const copy = siteCopy[language].professionals
  const { categories, items, isLoading, error } = useHomeListings()

  return (
    <div className="professionals-page">
      <header className="professionals-hero">
        <p className="professionals-hero__eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p className="professionals-hero__text">{copy.text}</p>
        <span className="professionals-hero__accent" aria-hidden="true"></span>
      </header>

      {isLoading ? (
        <div className="feedback-card professionals-page__feedback">
          {copy.loading}
        </div>
      ) : null}

      {!isLoading && error ? (
        <div className="feedback-card professionals-page__feedback">
          {copy.error}
        </div>
      ) : null}

      {!isLoading && !error ? (
        <div className="professionals-rows">
          {categories.map((category) => {
            const categoryItems = sortListingsVipFirst(
              items.filter((item) => item.categoryId === category.id),
              language,
            )

            if (categoryItems.length === 0) {
              return null
            }

            return (
              <ListingGrid
                key={category.id}
                className="professionals-row"
                title={copy.categoryTitles[category.id] || category.labels[language]}
                seeAllHref={`/professionals/${category.id}`}
                items={categoryItems}
                activeCategory=""
                isLoading={false}
                error=""
                language={language}
              />
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
