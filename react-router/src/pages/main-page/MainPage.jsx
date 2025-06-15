import styles from './MainPage.module.css'

import { useState } from 'react'
import { useGetItems, useAddItem, useDeleteItem } from '../../hooks'
import { Loader } from '../../components'
import { TodoLink, PanelTop, PanelBottom } from './components'

export const MainPage = () => {
  /** Состояния полей ввода */
  const [todoInput, setTodoInput] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [sortInput, setSortInput] = useState(false)

  /** Хуки CRUD */
  const { todos, filteredTodos, setTodos, isLoading } = useGetItems(
    searchInput,
    sortInput,
  )
  const { addItem, isCreating } = useAddItem(setTodos, setTodoInput)
  const { deleteItem, isDeleting } = useDeleteItem(setTodos)

  /** Флаг для показа лоадера */
  const showLoader = isCreating || isLoading || isDeleting

  return (
    <>
      <h1>Todo list ({todos.length})</h1>
      {showLoader && <Loader />}
      {/** Добавление, Поиск и Сортировка Todo */}
      <PanelTop
        showLoader={showLoader}
        todos={todos}
        filteredTodos={filteredTodos}
        addItem={addItem}
        panelTopState={{
          todoInput,
          setTodoInput,
          searchInput,
          setSearchInput,
          setSortInput,
        }}
      />
      {/** Список Todo */}
      {todos.length ? ( // если есть, что выводить
        <ol className={styles.todos + (showLoader ? ' ' + styles.loading : '')}>
          {filteredTodos.length ? ( // если есть, что выводить при поиске
            filteredTodos.map(({ id, title }) => (
              <TodoLink key={id} id={id} title={title} />
            ))
          ) : (
            // если нечего выводить при поиске
            <p>Ничего не найдено</p>
          )}
        </ol>
      ) : (
        // если нечего выводить
        <p style={{ textAlign: 'center' }}>
          Список todo пуст
          <br />
          Добавь todo или загрузи mock
        </p>
      )}
      {/** Дополнительные кнопки для работы со всем списком */}
      <PanelBottom
        showLoader={showLoader}
        addItem={addItem}
        deleteItem={deleteItem}
        setSearchInput={setSearchInput}
      />
    </>
  )
}
