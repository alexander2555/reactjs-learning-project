import { useState } from 'react'
import { ref, set } from 'firebase/database'
import { db } from '../fb'

export const useUpdateItem = () => {
  const [isUpdating, setIsUpdating] = useState(false)

  const updateItem = (todoId, todoTitle) => {
    setIsUpdating(true)

    const itemDBRef = ref(db, 'items/' + todoId)

    set(itemDBRef, {
      title: todoTitle,
    })
      .then(() => {
        console.log('Обновление todo:', todoId, todoTitle)
      })
      .finally(() => setIsUpdating(false))
  }
  return { updateItem, isUpdating }
}
