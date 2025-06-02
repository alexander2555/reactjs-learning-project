import { useEffect, useState } from 'react'
import styles from './App.module.css'

export const App = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('https://mocki.io/v1/399c66c5-e6e9-4c0c-96a6-28ed14af5d8a')
      .then(data => data.json())
      .then(p => {
        setProducts(p)
      })
  }, [])

  return (
    <div className={styles.app}>
      {products.map(({ id, name, price }) => (
        <div key={id}>
          {name}: {price} р.
        </div>
      ))}
    </div>
  )
}
