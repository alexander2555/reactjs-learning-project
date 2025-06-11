import { useState } from 'react'
import { useGetItems, useAddItem, useUpdateItem, useDeleteItem } from './hooks'
import { Task } from './components/Task'

import styles from './App.module.css'

export const App = () => {
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
  const { updateItem, isUpdating } = useUpdateItem(setTodos)
  const { deleteItem, isDeleting } = useDeleteItem(setTodos)
  /** Флаг для показа лоадера */
  const showLoader = isCreating || isLoading || isUpdating || isDeleting

  return (
    <div className={styles.app}>
      <h1>Todo list ({todos.length})</h1>
      {showLoader && <div className={styles.loader}></div>}
      {/** Добавление Todo */}
      <div className={styles['input-group']}>
        <hr />
        <input
          className={styles['todo-item-input']}
          type='text'
          value={todoInput}
          onChange={({ target }) => setTodoInput(target.value)}
          onKeyUp={({ key }) => (key === 'Enter' ? addItem(todoInput) : false)} // для обработки нажатия Enter
          placeholder='Новое todo'
        />
        &nbsp;
        <button
          className={styles['todo-item-btn']}
          onClick={() => addItem(todoInput)}
          disabled={showLoader || !todoInput}
          title='Добавить todo'
        >
          +
        </button>
      </div>
      {/** Поиск (фильтр) Todo */}
      {todos.length > 1 && (
        <div className={styles['input-group']}>
          <hr />
          <input
            className={styles['todo-item-input']}
            type='text'
            value={searchInput}
            onChange={({ target }) => setSearchInput(target.value)}
            placeholder='Поиск todo'
          />
          &nbsp;
          {searchInput && <span>({filteredTodos.length})</span>}
        </div>
      )}
      {/** Сортировка Todo */}
      {todos.length > 1 && (
        <div className={styles['input-group']}>
          <hr />
          <label htmlFor='sortBtn'>Сортировка</label>
          <input
            id='sortBtn'
            type='checkbox'
            className={styles['todo-item-cb']}
            onClick={({ target }) => setSortInput(target.checked)}
            disabled={showLoader}
          />
        </div>
      )}
      {/** Список Todo */}
      {todos.length ? ( // если есть, что выводить
        <ol className={styles.todos + (showLoader ? ' ' + styles.loading : '')}>
          {filteredTodos.map(({ id, title }) => (
            <li key={id} data-id={id} data-title={title} className={styles['todo-item']}>
              <Task id={id} title={title} updateItem={updateItem} />
              <hr />
            </li>
          ))}
        </ol>
      ) : (
        // если нечего выводить
        <p style={{ textAlign: 'center' }}>
          Список todo пуст
          <br />
          Добавте первое todo или загрузите mock
        </p>
      )}
      {/** Дополнительные кнопки для работы со всем списком (BONUS) */}
      <div className={styles['input-group']}>
        <button
          className={styles['todo-item-btn']}
          onClick={() => {
            if (confirm('Точно?!')) deleteItem()
          }}
          disabled={showLoader}
          title='удалить'
        >
          Удалить все &times;
        </button>
        &nbsp;
        <button
          className={styles['todo-item-btn']}
          onClick={() => {
            if (confirm('Уверен?!')) addItem()
          }}
          disabled={showLoader}
          title='загрузить из jsonplaceholder'
        >
          Загрузить mock
        </button>
        <hr />
      </div>
    </div>
  )
}
