import { useEffect, useState } from 'react'

export const useGetItems = refresh => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    fetch('http://localhost:3003/products')
      .then(data => data.json())
      .then(p => {
        setProducts(p)
      })
      .finally(() => setIsLoading(false))
  }, [refresh])

  return { products, isLoading }
}
