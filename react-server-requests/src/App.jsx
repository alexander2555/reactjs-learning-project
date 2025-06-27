import { useState } from 'react'
import { useGetItems } from './hooks'
import { Todo, Panel } from './components'
import { AppContext } from './context'

import styles from './App.module.css'

export const App = () => {
  const [searchInput, setSearchInput] = useState('')
  const [sortInput, setSortInput] = useState(false)

  const { todos, filteredTodos, setTodos, isLoading } = useGetItems(
    searchInput,
    sortInput,
  )

  return (
    <AppContext
      value={{
        isLoading,
        filteredTodos,
        todos,
        setTodos,
        searchInput,
        setSearchInput,
        sortInput,
        setSortInput,
      }}
    >
      <div className={styles.app}>
        <h1>Todo list ({todos.length})</h1>
        {/** Панель добавления, поиска и сортировки */}
        <Panel />
        {/** Список Todo */}
        {todos.length ? ( // если есть, что выводить
          <ol className={styles.todos + (isLoading ? ' ' + styles.loading : '')}>
            {filteredTodos.length ? ( // если есть, что выводить при поиске
              filteredTodos.map(({ id, title }) => (
                <Todo
                  key={id}
                  id={id}
                  title={title}
                  showLoader={isLoading}
                  setTodos={setTodos}
                />
              ))
            ) : (
              // если нечего выводить при поиске
              <p>Ничего не найдено</p>
            )}
          </ol>
        ) : (
          // если нечего выводить
          <p style={{ textAlign: 'center', flex: '1 1 auto' }}>
            Список todo пуст
            <br />
            Добавь новое todo
          </p>
        )}
        {isLoading && <div className={styles.loader}></div>}
      </div>
    </AppContext>
  )
}
