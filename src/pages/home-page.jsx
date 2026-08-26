import { AboutSection } from '../components/home/about-section.jsx'
import { CategoryGrid } from '../components/home/category-grid.jsx'
import { ContactSection } from '../components/home/contact-section.jsx'
import { HeroSection } from '../components/home/hero-section.jsx'
import { HowItWorksSection } from '../components/home/how-it-works-section.jsx'
import { ListingGrid } from '../components/home/listing-grid.jsx'
import { homeCategories } from '../content/home-categories.js'
import { siteCopy } from '../content/site-copy.js'
import { useVipListings } from '../hooks/use-vip-listings.js'
import { useAppPreferences } from '../state/app-preferences.js'

export function HomePage() {
  const { language } = useAppPreferences()
  const copy = siteCopy[language]
  const { items, isLoading, error } = useVipListings()

  return (
    <div className="home-page">
      <HeroSection
        titleTop={copy.heroTitleTop}
        titleAccent={copy.heroTitleAccent}
        text={copy.heroText}
      />
      <CategoryGrid categories={homeCategories} language={language} />
      <ListingGrid
        items={items}
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
