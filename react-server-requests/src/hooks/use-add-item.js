import { useState } from 'react'

export const useAddItem = setItems => {
  const [isCreating, setIsCreating] = useState(false)

  const addItem = () => {
    setIsCreating(true)

    fetch('http://localhost:3003/products', {
      method: 'POST',
      headers: { 'Content-type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        name: 'Новый элемент',
        price: 4242,
      }),
    })
      .then(rawResp => rawResp.json())
      .then(newItem => {
        console.log('добавлен новый элемент:', newItem)
        setItems(items => [...items, newItem])
      })
      .finally(() => setIsCreating(false))
  }

  return { addItem, isCreating }
}
