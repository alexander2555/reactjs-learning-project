import { useState } from 'react'

export const useDeleteItem = (refresh, setRefresh) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteItem = () => {
    setIsDeleting(true)

    fetch('http://localhost:3003/products/001', {
      method: 'DELETE',
    })
      .then(rawResp => rawResp.json())
      .then(resp => {
        console.log('Удалён элемент:', resp)
        setRefresh(!refresh)
      })
      .finally(() => setIsDeleting(false))
  }
  return { deleteItem, isDeleting }
}
