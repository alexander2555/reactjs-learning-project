import { useState } from 'react'

const delTodo = id =>
  fetch('http://localhost:3003/todos/' + id, {
    method: 'DELETE',
  })

export const useDeleteItem = setTodos => {
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteItem = todoId => {
    setIsDeleting(true)

    const deleteTodos = todoId
      ? delTodo(todoId).then(() => {
          setTodos(items => items.filter(i => i.id != todoId))
          console.log('Удалено todo:', todoId)
        })
      : fetch('http://localhost:3003/todos')
          .then(rawResp => rawResp.json())
          .then(async todos => {
            for (const { id } of todos) {
              await new Promise(res => setTimeout(res, 10)) // Задержка против блокировки db.json
              await delTodo(id)
            }
            return todos.length
            // return Promise.all(todos.map(({ id }) => delTodo(id)))
          })
          .then(count => {
            setTodos([])
            console.log(`Удалены все ${count} todo`)
          })
          .catch(err => console.error('Ошибка удаления:', err))

    deleteTodos.finally(() => setIsDeleting(false))
  }
  return { deleteItem, isDeleting }
}
