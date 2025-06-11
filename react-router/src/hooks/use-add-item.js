import { useState } from 'react'

const putTodo = async todoTitle => {
  try {
    const response = await fetch('http://localhost:3003/todos', {
      method: 'POST',
      headers: { 'Content-type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        title: todoTitle,
      }),
    })

    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    await new Promise(res => setTimeout(res, 42)) // Задержка против блокировки db.json

    return await response.json()
  } catch (err) {
    console.warn(err.message)
    // throw err
  }
}

export const useAddItem = (setTodos, setTodoInput) => {
  const [isCreating, setIsCreating] = useState(false)

  const addItem = todoTitle => {
    setTodoInput('')
    setIsCreating(true)

    const postTodos = todoTitle
      ? putTodo(todoTitle).then(newItem => {
          setTodos(items => [...items, newItem])
          console.log('Добавлено todo:', newItem)
        })
      : fetch('https://jsonplaceholder.typicode.com/todos')
          .then(data => data.json())
          .then(async todos => {
            const todoItems = []
            for (const { id, title } of todos) {
              await putTodo(title)
              todoItems.push({ id, title })
              if (id >= 42) break
            }
            return todoItems
            //Promise.all(todoItems.map(({ title }) => pushTodo(title)))
          })
          .then(todoItems => {
            setTodos(todoItems) // setTodos(items => [...items, ...todoItems])
            console.log(`Добавлено ${todoItems.length} todo`)
          })

    postTodos.finally(() => setIsCreating(false))
  }

  return { addItem, isCreating }
}
