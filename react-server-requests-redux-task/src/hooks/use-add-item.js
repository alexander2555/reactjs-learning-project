import { useState } from 'react'
import { ref, push } from 'firebase/database'
import { db } from '../fb'

const itemsDBRef = ref(db, 'items')

const pushTodo = todoTitle => {
  return push(itemsDBRef, {
    title: todoTitle,
  }).then(() => {
    console.log('Добавлено todo:', todoTitle)
  })
}

export const useAddItem = setTodoInput => {
  const [isCreating, setIsCreating] = useState(false)

  const addItem = todoTitle => {
    setIsCreating(true)

    if (todoTitle) {
      setTodoInput('')
      pushTodo(todoTitle).finally(() => setIsCreating(false))
    } else {
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(data => data.json())
        .then(todoItems => todoItems.forEach(({ title }) => pushTodo(title).finally()))
        .finally(() => setIsCreating(false))
    }
  }

  return { addItem, isCreating }
}
