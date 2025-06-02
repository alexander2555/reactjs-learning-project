import { useState } from 'react'

export const useAddItem = (setTodos, setTodoInput) => {
  const [isCreating, setIsCreating] = useState(false)

  const addItem = todoTitle => {
    setIsCreating(true)

    fetch('http://localhost:3003/todos', {
      method: 'POST',
      headers: { 'Content-type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        title: todoTitle,
      }),
    })
      .then(rawResp => rawResp.json())
      .then(newItem => {
        setTodos(items => [...items, newItem])
        console.log('Добавлено todo:', newItem)
        setTodoInput('')
      })
      .finally(() => setIsCreating(false))
  }

  return { addItem, isCreating }
}
