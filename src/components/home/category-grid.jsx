import { Link } from 'react-router-dom'
import { CategoryIcon } from './category-icon.jsx'

export function CategoryGrid({ categories, language }) {
  return (
    <section id="categories" className="home-section">
      <div className="section-heading">
        <h2 className="section-heading__title">
          {language === 'ka' ? 'კატეგორიები' : 'Categories'}
        </h2>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <Link
            key={category.id}
            className="category-card"
            to={`/professionals/${category.id}`}
          >
            <CategoryIcon icon={category.icon} />
            <span className="category-card__label">
              {category.labels[language]}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
