import { AboutSection } from '../components/home/about-section.jsx'
import { CategoryGrid } from '../components/home/category-grid.jsx'
import { ContactSection } from '../components/home/contact-section.jsx'
import { HeroSection } from '../components/home/hero-section.jsx'
import { HowItWorksSection } from '../components/home/how-it-works-section.jsx'
import { ListingGrid } from '../components/home/listing-grid.jsx'
import { siteCopy } from '../content/site-copy.js'
import { useHomeListings } from '../hooks/use-home-listings.js'
import { useAppPreferences } from '../state/app-preferences.js'
import { getLocalizedValue } from '../utils/get-localized-value.js'

export function HomePage() {
  const { language } = useAppPreferences()
  const copy = siteCopy[language]
  const { categories, items, isLoading, error } = useHomeListings()

  const vipItems = items.filter((item) => item.vip)

  const sortedItems = [...vipItems].sort((leftItem, rightItem) =>
    getLocalizedValue(leftItem.title, language).localeCompare(
      getLocalizedValue(rightItem.title, language),
      language,
    ),
  )

  return (
    <div className="home-page">
      <HeroSection
        eyebrow={copy.heroEyebrow}
        titleTop={copy.heroTitleTop}
        titleAccent={copy.heroTitleAccent}
        text={copy.heroText}
      />
      <CategoryGrid categories={categories} language={language} />
      <ListingGrid
        items={sortedItems}
        seeAllHref="/professionals"
        activeCategory=""
        isLoading={isLoading}
        error={error}
        language={language}
      />
      <HowItWorksSection
        title={copy.processTitle}
        steps={copy.processSteps}
      />
      <AboutSection content={copy.about} />
      <ContactSection content={copy.contact} />
    </div>
  )
}
