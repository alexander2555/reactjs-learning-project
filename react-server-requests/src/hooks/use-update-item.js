import { useState } from 'react'
import { ref, set } from 'firebase/database'
import { db } from '../fb'

export const useUpdateItem = () => {
  const [isUpdating, setIsUpdating] = useState(false)

  const updateItem = () => {
    setIsUpdating(true)

    const itemDBRef = ref(db, 'items/-ORv20mfk1QGP-px8OjW')

    set(itemDBRef, {
      name: 'Новый элемент',
      price: 424242,
    })
      .then(resp => {
        console.log('изменен элемент:', resp)
      })
      .finally(() => setIsUpdating(false))
  }

  return { updateItem, isUpdating }
}
