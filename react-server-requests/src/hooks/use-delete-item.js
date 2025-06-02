import { useState } from 'react'

export const useDeleteItem = setTodos => {
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteItem = todoId => {
    setIsDeleting(true)

    fetch('http://localhost:3003/todos/' + todoId, {
      method: 'DELETE',
    })
      .then(rawResp => rawResp.json())
      .then(_ => {
        setTodos(items => items.filter(i => i.id != todoId))
        console.log('Удалено todo', todoId)
      })
      .finally(() => setIsDeleting(false))
  }
  return { deleteItem, isDeleting }
}
