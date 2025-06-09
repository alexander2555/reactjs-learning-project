import { useState } from 'react'
import { useGetItems, useAddItem, useDeleteItem } from './hooks'
import { Todo, PanelTop, PanelBottom } from './components'

import styles from './App.module.css'

export const App = () => {
  const [todoInput, setTodoInput] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [sortInput, setSortInput] = useState(false)

  const { todos, filteredTodos, setTodos, isLoading } = useGetItems(
    searchInput,
    sortInput,
  )
  const { addItem, isCreating } = useAddItem(setTodoInput)
  const { deleteItem, isDeleting } = useDeleteItem()

  return (
    <div className={styles.app}>
      <h1>Todo list ({todos.length})</h1>
      {/** Панель добавления, поиска и сортировки */}
      <PanelTop
        todos={todos}
        showLoader={isLoading}
        panelTopState={{
          todoInput,
          setTodoInput,
          searchInput,
          setSearchInput,
          setSortInput,
        }}
        addItem={addItem}
        filteredTodos={filteredTodos}
      />
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
      {/** Дополнительные кнопки для работы со всем списком */}
      <PanelBottom
        showLoader={isLoading}
        addItem={addItem}
        deleteItem={deleteItem}
        setSearchInput={setSearchInput}
      />
      {isLoading && <div className={styles.loader}></div>}
    </div>
  )
}
