export function getLocalizedValue(value, language) {
  if (typeof value === 'string') {
    return value
  }

  return value?.[language] || value?.en || value?.ka || ''
}
