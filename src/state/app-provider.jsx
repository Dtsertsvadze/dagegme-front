import { useEffect, useState } from 'react'
import {
  AppPreferencesContext,
  LANGUAGES,
  STORAGE_KEYS,
  THEMES,
} from './app-preferences.js'

const LANGUAGE_PREFERENCE_VERSION = 'georgian-default-v1'

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return THEMES.LIGHT
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEYS.theme)

  if (storedTheme === THEMES.LIGHT || storedTheme === THEMES.DARK) {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEMES.DARK
    : THEMES.LIGHT
}

function getInitialLanguage() {
  if (typeof window === 'undefined') {
    return LANGUAGES.GEORGIAN
  }

  const storedLanguageVersion = window.localStorage.getItem(
    STORAGE_KEYS.languageVersion,
  )

  if (storedLanguageVersion !== LANGUAGE_PREFERENCE_VERSION) {
    return LANGUAGES.GEORGIAN
  }

  const storedLanguage = window.localStorage.getItem(STORAGE_KEYS.language)

  if (
    storedLanguage === LANGUAGES.ENGLISH ||
    storedLanguage === LANGUAGES.GEORGIAN
  ) {
    return storedLanguage
  }

  return LANGUAGES.GEORGIAN
}

function getInitialWishlist() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const storedWishlist = JSON.parse(
      window.localStorage.getItem(STORAGE_KEYS.wishlist) || '[]',
    )

    return Array.isArray(storedWishlist) ? storedWishlist : []
  } catch {
    return []
  }
}

function createWishlistItem(item) {
  return {
    id: item.id,
    categoryId: item.categoryId,
    categoryName: item.categoryName,
    title: item.title,
    description: item.description,
    imageUrl: item.imageUrl,
    href: item.href,
  }
}

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)
  const [language, setLanguage] = useState(getInitialLanguage)
  const [wishlist, setWishlist] = useState(getInitialWishlist)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem(STORAGE_KEYS.theme, theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dataset.language = language
    window.localStorage.setItem(STORAGE_KEYS.language, language)
    window.localStorage.setItem(
      STORAGE_KEYS.languageVersion,
      LANGUAGE_PREFERENCE_VERSION,
    )
  }, [language])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlist))
  }, [wishlist])

  function toggleWishlist(item) {
    setWishlist((currentWishlist) => {
      const isSaved = currentWishlist.some(
        (wishlistItem) => wishlistItem.id === item.id,
      )

      return isSaved
        ? currentWishlist.filter((wishlistItem) => wishlistItem.id !== item.id)
        : [...currentWishlist, createWishlistItem(item)]
    })
  }

  function removeFromWishlist(itemId) {
    setWishlist((currentWishlist) =>
      currentWishlist.filter((item) => item.id !== itemId),
    )
  }

  const value = {
    language,
    setLanguage,
    theme,
    setTheme,
    wishlist,
    toggleWishlist,
    removeFromWishlist,
    isInWishlist: (itemId) => wishlist.some((item) => item.id === itemId),
    toggleTheme: () =>
      setTheme((currentTheme) =>
        currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK,
      ),
  }

  return (
    <AppPreferencesContext.Provider value={value}>
      {children}
    </AppPreferencesContext.Provider>
  )
}
