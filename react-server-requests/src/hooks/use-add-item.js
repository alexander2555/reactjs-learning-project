import { useState } from 'react'
import { ref, push } from 'firebase/database'
import { db } from '../fb'

export const useAddItem = () => {
  const [isCreating, setIsCreating] = useState(false)

  const addItem = () => {
    setIsCreating(true)

    const itemsDBRef = ref(db, 'items')

    push(itemsDBRef, {
      name: 'Новый элемент',
      price: 4242,
    })
      .then(resp => {
        console.log('добавлен новый элемент:', resp)
      })
      .finally(() => setIsCreating(false))
  }

  return { addItem, isCreating }
}
