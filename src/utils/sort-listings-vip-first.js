import { getLocalizedValue } from './get-localized-value.js'

export function sortListingsVipFirst(items, language) {
  return [...items].sort((leftItem, rightItem) => {
    if (leftItem.vip !== rightItem.vip) {
      return leftItem.vip ? -1 : 1
    }

    return getLocalizedValue(leftItem.title, language).localeCompare(
      getLocalizedValue(rightItem.title, language),
      language,
    )
  })
}
