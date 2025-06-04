import { useState } from 'react'
import { ref, remove } from 'firebase/database'
import { db } from '../fb'

export const useDeleteItem = () => {
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteItem = () => {
    setIsDeleting(true)

    const itemDBRef = ref(db, 'items/-ORv20mfk1QGP-px8OjW')

    remove(itemDBRef)
      .then(resp => {
        console.log('Удалён элемент:', resp)
      })
      .finally(() => setIsDeleting(false))
  }

  return { deleteItem, isDeleting }
}
