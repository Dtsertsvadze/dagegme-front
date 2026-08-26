import { apiBaseUrl } from '../config/api.js'
import { homeCategories } from '../content/home-categories.js'

const LINK_CATEGORY_IDS = new Set([
  'bands',
  'djs',
  'photographers',
  'videographers',
])

const GALLERY_CATEGORY_IDS = new Set([
  'bands',
  'photographers',
  'rental-cars',
  'studios',
])

function normalizeLinks(links) {
  if (typeof links === 'string') {
    try {
      return normalizeLinks(JSON.parse(links))
    } catch {
      return links.trim() ? [links.trim()] : []
    }
  }

  if (!Array.isArray(links)) {
    return []
  }

  return links.filter((link) => typeof link === 'string' && link.trim() !== '')
}

function normalizeLocalizedField(item, field) {
  const value = item[field]

  if (value && typeof value === 'object') {
    return {
      en: value.en || value.ka || '',
      ka: value.ka || value.en || '',
    }
  }

  const fallback = typeof value === 'string' ? value : ''

  return {
    en: item[`${field}_en`] || item[`${field}_ka`] || fallback,
    ka: item[`${field}_ka`] || item[`${field}_en`] || fallback,
  }
}

function normalizeTitle(category, item) {
  if (category.id === 'rental-cars') {
    const mark = normalizeLocalizedField(item, 'mark')
    const model = normalizeLocalizedField(item, 'model')

    return {
      en: [mark.en, model.en].filter(Boolean).join(' '),
      ka: [mark.ka, model.ka].filter(Boolean).join(' '),
    }
  }

  return normalizeLocalizedField(item, 'name')
}

function normalizeDescription(category, item) {
  if (category.id === 'rental-cars') {
    const year = item.year ? `${item.year}` : ''

    return { en: year, ka: year }
  }

  return normalizeLocalizedField(item, 'description')
}

function normalizePhotos(photos) {
  if (!Array.isArray(photos)) {
    return []
  }

  return photos
    .map((photo) => photo?.photo_url)
    .filter(Boolean)
}

function normalizeListing(category, item) {
  const links = LINK_CATEGORY_IDS.has(category.id)
    ? normalizeLinks(item.links)
    : []

  return {
    id: `${category.id}-${item.id}`,
    categoryId: category.id,
    categoryName: category.labels,
    title: normalizeTitle(category, item),
    description: normalizeDescription(category, item),
    imageUrl: item.profile_photo_url || '',
    href: links[0] || '',
    links,
    vip: Boolean(item.vip),
    photos: GALLERY_CATEGORY_IDS.has(category.id)
      ? normalizePhotos(item.photos)
      : [],
    raw: item,
  }
}

export async function fetchHomeListings({ signal } = {}) {
  const results = await Promise.all(
    homeCategories.map(async (category) => {
      const response = await fetch(`${apiBaseUrl}/${category.endpoint}`, { signal })

      if (!response.ok) {
        throw new Error(`Failed to load ${category.id}.`)
      }

      const data = await response.json()
      const items = Array.isArray(data) ? data : []

      return {
        ...category,
        items: items.map((item) => normalizeListing(category, item)),
      }
    }),
  )

  return {
    categories: results.map(({ items, ...category }) => ({
      ...category,
      count: items.length,
    })),
    items: results.flatMap((result) => result.items),
  }
}
