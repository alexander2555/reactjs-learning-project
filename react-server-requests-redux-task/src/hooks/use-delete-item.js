import { useState } from 'react'
import { ref, remove } from 'firebase/database'
import { db } from '../fb'

export const useDeleteItem = () => {
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteItem = todoId => {
    setIsDeleting(true)

    const itemDBRef = ref(db, 'items' + (todoId ? '/' + todoId : ''))

    remove(itemDBRef)
      .then(() => {
        console.log('Удалено todo:', todoId ? todoId : 'все')
      })
      .finally(() => setIsDeleting(false))
  }
  return { deleteItem, isDeleting }
}
