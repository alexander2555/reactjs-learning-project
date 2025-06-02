import { useState } from 'react'

export const useUpdateItem = setTodos => {
  const [isUpdating, setIsUpdating] = useState(false)

  const updateItem = (todoId, todoTitle) => {
    setIsUpdating(true)

    fetch('http://localhost:3003/todos/' + todoId, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        id: todoId,
        title: todoTitle,
      }),
    })
      .then(rawResp => rawResp.json())
      .then(item => {
        if (todoId) {
          console.log('Обновление todo:', item)
          setTodos(items => items.map(i => (i.id == todoId ? item : i)))
        }
      })
      .finally(() => setIsUpdating(false))
  }
  return { updateItem, isUpdating }
}
