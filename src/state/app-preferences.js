import { createContext, useContext } from 'react'

export const STORAGE_KEYS = {
  language: 'app-language',
  theme: 'app-theme',
  wishlist: 'app-wishlist',
}

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
}

export const LANGUAGES = {
  ENGLISH: 'en',
  GEORGIAN: 'ka',
}

export const AppPreferencesContext = createContext(null)

export function useAppPreferences() {
  const context = useContext(AppPreferencesContext)

  if (!context) {
    throw new Error('useAppPreferences must be used within an AppProvider')
  }

  return context
}
