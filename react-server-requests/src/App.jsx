import { useEffect, useState } from 'react'
import styles from './App.module.css'

export const App = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    fetch('http://localhost:3003/products/?id=001')
      .then(data => data.json())
      .then(p => {
        setProducts(p)
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className={styles.app}>
      {isLoading && <div className={styles.loader}></div>}
      {products.map(({ id, name, price }) => (
        <div key={id}>
          {name}: {price} р.
        </div>
      ))}
    </div>
  )
}
