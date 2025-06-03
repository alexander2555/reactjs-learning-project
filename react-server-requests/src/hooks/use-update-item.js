import { useState } from 'react'

export const useUpdateItem = (refresh, setRefresh) => {
  const [isUpdating, setIsUpdating] = useState(false)

  const updateItem = () => {
    setIsUpdating(true)

    fetch('http://localhost:3003/products/001', {
      method: 'PUT',
      headers: { 'Content-type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        name: 'Новый элемент',
        price: 424242,
      }),
    })
      .then(rawResp => rawResp.json())
      .then(resp => {
        console.log('изменен элемент:', resp)
        setRefresh(!refresh)
      })
      .finally(() => setIsUpdating(false))
  }
  return { updateItem, isUpdating }
}
