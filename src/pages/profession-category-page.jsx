import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ListingCard } from '../components/home/listing-card.jsx'
import { homeCategories } from '../content/home-categories.js'
import { siteCopy } from '../content/site-copy.js'
import { useHomeListings } from '../hooks/use-home-listings.js'
import { useAppPreferences } from '../state/app-preferences.js'
import { getLocalizedValue } from '../utils/get-localized-value.js'

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M19 12H5M10 7l-5 5l5 5" />
    </svg>
  )
}

export function ProfessionCategoryPage() {
  const { categoryId } = useParams()
  const { language } = useAppPreferences()
  const [selectedCity, setSelectedCity] = useState('')
  const { items, isLoading, error } = useHomeListings()
  const copy = siteCopy[language].professionals
  const category = homeCategories.find((item) => item.id === categoryId)

  if (!category) {
    return <Navigate to="/professionals" replace />
  }

  const categoryItems = items.filter((item) => item.categoryId === categoryId)
  const citiesByKey = new Map()

  categoryItems.forEach((item) => {
    const cityKey = getLocalizedValue(item.city, 'en').trim()
    const cityLabel = getLocalizedValue(item.city, language).trim()

    if (cityKey && cityLabel) {
      citiesByKey.set(cityKey, cityLabel)
    }
  })

  const cities = [...citiesByKey.entries()].sort((leftCity, rightCity) =>
    leftCity[1].localeCompare(rightCity[1], language),
  )
  const filteredItems = categoryItems
    .filter(
      (item) =>
        !selectedCity ||
        getLocalizedValue(item.city, 'en').trim() === selectedCity,
    )
    .sort((leftItem, rightItem) =>
      getLocalizedValue(leftItem.title, language).localeCompare(
        getLocalizedValue(rightItem.title, language),
        language,
      ),
    )
  const categoryTitle =
    copy.categoryTitles[categoryId] || category.labels[language]

  return (
    <div className="profession-category-page">
      <Link className="profession-category-page__back" to="/professionals">
        <BackIcon />
        <span>{copy.categoryPage.back}</span>
      </Link>

      <header className="profession-category-header">
        <div>
          <p>{copy.eyebrow}</p>
          <h1>{categoryTitle}</h1>
          <span>{copy.categoryPage.subtitle}</span>
        </div>

        <label className="city-filter">
          <span>{copy.categoryPage.cityLabel}</span>
          <span className="city-filter__control">
            <select
              value={selectedCity}
              onChange={(event) => setSelectedCity(event.target.value)}
              disabled={isLoading || cities.length === 0}
            >
              <option value="">{copy.categoryPage.allCities}</option>
              {cities.map(([cityKey, cityLabel]) => (
                <option key={cityKey} value={cityKey}>
                  {cityLabel}
                </option>
              ))}
            </select>
          </span>
        </label>
      </header>

      {isLoading ? (
        <div className="feedback-card profession-category-page__feedback">
          {copy.loading}
        </div>
      ) : null}

      {!isLoading && error ? (
        <div className="feedback-card profession-category-page__feedback">
          {copy.error}
        </div>
      ) : null}

      {!isLoading && !error ? (
        <>
          <p className="profession-category-page__count">
            {copy.categoryPage.results.replace('{count}', filteredItems.length)}
          </p>
          {filteredItems.length > 0 ? (
            <div className="professionals-listing-grid">
              {filteredItems.map((item) => (
                <ListingCard key={item.id} item={item} language={language} />
              ))}
            </div>
          ) : (
            <div className="feedback-card profession-category-page__feedback">
              {copy.categoryPage.empty}
            </div>
          )}
        </>
      ) : null}
    </div>
  )
}
