import { useEffect, useState } from 'react'
import { fetchHomeListings } from '../services/home-listings.js'

export function useHomeListings() {
  const [state, setState] = useState({
    categories: [],
    items: [],
    isLoading: true,
    error: '',
  })

  useEffect(() => {
    const controller = new AbortController()

    async function loadHomeListings() {
      try {
        const data = await fetchHomeListings({ signal: controller.signal })

        setState({
          categories: data.categories,
          items: data.items,
          isLoading: false,
          error: '',
        })
      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }

        setState({
          categories: [],
          items: [],
          isLoading: false,
          error: 'Could not load homepage listings.',
        })
      }
    }

    loadHomeListings()

    return () => controller.abort()
  }, [])

  return state
}
