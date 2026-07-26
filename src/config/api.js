const fallbackApiBaseUrl = 'https://api.dagegme.com/api'

export const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL || fallbackApiBaseUrl
).replace(/\/$/, '')

export function getApiOrigin() {
  return apiBaseUrl.replace(/\/api$/, '')
}
