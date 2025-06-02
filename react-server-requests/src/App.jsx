import { useState } from 'react'
import { useGetItems } from './hooks'
import { Todo, Panel } from './components'

import styles from './App.module.css'

export const App = () => {
  const [searchInput, setSearchInput] = useState('')
  const [sortInput, setSortInput] = useState(false)

  const { todos, filteredTodos, setTodos, isLoading } = useGetItems(
    searchInput,
    sortInput,
  )

  return (
    <div className={styles.app}>
      <h1>Todo list ({todos.length})</h1>
      {/** Панель добавления, поиска и сортировки */}
      <Panel
        showLoader={isLoading}
        panelState={{ searchInput, setSearchInput, sortInput, setSortInput }}
        todosState={{ todos, setTodos }}
        filteredTodos={filteredTodos}
      />
      {/** Список Todo */}
      <ol className={styles.todos + (isLoading ? ' ' + styles.loading : '')}>
        {filteredTodos.map(({ id, title }) => (
          <Todo
            key={id}
            id={id}
            title={title}
            showLoader={isLoading}
            setTodos={setTodos}
          />
        ))}
      </ol>

      {isLoading && <div className={styles.loader}></div>}
    </div>
  )
}
