import { useState } from 'react'

export const useDeleteItem = setItems => {
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteItem = () => {
    setIsDeleting(true)

    const itemId = '001'
    fetch(`http://localhost:3003/products/${itemId}`, {
      method: 'DELETE',
    })
      .then(rawResp => rawResp.json())
      .then(item => {
        setItems(items => items.filter(i => i.id !== itemId))
        console.log('Удалён элемент:', item)
      })
      .finally(() => setIsDeleting(false))
  }

  return { deleteItem, isDeleting }
}
