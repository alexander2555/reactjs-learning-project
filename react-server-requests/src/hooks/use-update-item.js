import { useState } from 'react'

export const useUpdateItem = setItems => {
  const [isUpdating, setIsUpdating] = useState(false)

  const updateItem = () => {
    setIsUpdating(true)

    fetch('http://localhost:3003/products/001', {
      method: 'PUT',
      headers: { 'Content-type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        name: 'Новый измененный элемент',
        price: 424242,
      }),
    })
      .then(rawResp => rawResp.json())
      .then(item => {
        const itemId = item.id
        if (itemId) {
          setItems(items => items.map(i => (i.id === itemId ? item : i)))
          console.log('изменен элемент:', item)
        }
      })
      .finally(() => setIsUpdating(false))
  }

  return { updateItem, isUpdating }
}
