import { useEffect, useState } from 'react'
import styles from './App.module.css'

export const App = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(data => data.json())
      .then(todos => {
        setTodos(todos)
      })
  }, [])

  return (
    <div className={styles.app}>
      <h1>Todo list ({todos.length})</h1>
      <ul className={styles.todos}>
        {todos.map(({ id, title }) => (
          <li key={id} data-id={id} className={styles['todo-item']}>
            {title}
          </li>
        ))}
      </ul>
    </div>
  )
}
