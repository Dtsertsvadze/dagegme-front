import { useEffect, useState } from 'react'
import { fetchVipListings } from '../services/vip-listings.js'

export function useVipListings() {
  const [state, setState] = useState({
    items: [],
    isLoading: true,
    error: '',
  })

  useEffect(() => {
    const controller = new AbortController()

    async function loadVipListings() {
      try {
        const items = await fetchVipListings({ signal: controller.signal })

        setState({
          items,
          isLoading: false,
          error: '',
        })
      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }

        setState({
          items: [],
          isLoading: false,
          error: 'Could not load homepage VIP listings.',
        })
      }
    }

    loadVipListings()

    return () => controller.abort()
  }, [])

  return state
}
