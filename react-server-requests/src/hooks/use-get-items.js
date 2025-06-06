import { useEffect, useState } from 'react'

export const useGetItems = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    fetch('http://localhost:3003/products')
      .then(data => data.json())
      .then(dataItems => {
        setItems(dataItems)
      })
      .finally(() => setIsLoading(false))
  }, [])

  return { items, setItems, isLoading }
}
