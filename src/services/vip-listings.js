import { apiBaseUrl } from '../config/api.js'
import { homeCategories } from '../content/home-categories.js'

const categoriesByProviderType = new Map(
  homeCategories
    .filter((category) => category.entityType !== 'rental-car')
    .map((category) => [category.entityType, category]),
)

function normalizeVipCarouselItem(item) {
  const providerType = item?.provider_type
  const provider = item?.provider
  const category = categoriesByProviderType.get(providerType)

  if (!category || !provider || provider.id === undefined || provider.id === null) {
    return null
  }

  return {
    id: `${providerType}-${provider.id}`,
    categoryId: category.id,
    categoryName: category.labels,
    title: provider.name,
    description: provider.description || '',
    imageUrl: provider.profile_photo_url || '',
    detailsHref: `/professionals/${category.id}`,
    href: '',
    links: [],
    photos: [],
    vip: true,
    vipOrder: provider.vip_order,
    raw: provider,
  }
}

export async function fetchVipListings({ signal } = {}) {
  const response = await fetch(`${apiBaseUrl}/vips`, { signal })

  if (!response.ok) {
    throw new Error('Failed to load VIP listings.')
  }

  const data = await response.json()

  if (!Array.isArray(data)) {
    return []
  }

  return data.map(normalizeVipCarouselItem).filter(Boolean)
}
