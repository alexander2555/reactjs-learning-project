import { useEffect, useState } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from '../fb'

export const useGetItems = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const itemsDBRef = ref(db, 'items')

    return onValue(itemsDBRef, snapshot => {
      const loadedItems = snapshot.val() || []

      setItems(loadedItems)
      setIsLoading(false)
    })
  }, [])

  return { items, isLoading }
}
