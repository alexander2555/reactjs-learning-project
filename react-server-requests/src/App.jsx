import { useEffect, useRef, useState } from 'react'
import { useGetItems, useAddItem, useUpdateItem, useDeleteItem } from './hooks'

import styles from './App.module.css'

const initialEdit = {
  editing: null,
  inputVal: '',
}

export const App = () => {
  /** Состояния полей ввода */
  const [todoInput, setTodoInput] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [sortInput, setSortInput] = useState(false)
  const [editInput, setEditInput] = useState(initialEdit)
  /** Реф на поле редактирования для автофокуса */
  const todoInputRef = useRef(null)

  /** Хуки CRUD */
  const { todos, filteredTodos, isLoading } = useGetItems(searchInput, sortInput)
  const { addItem, isCreating } = useAddItem(setTodoInput)
  const { updateItem, isUpdating } = useUpdateItem()
  const { deleteItem, isDeleting } = useDeleteItem()
  /** Флаг для показа лоадера */
  const showLoader = isCreating || isLoading || isUpdating || isDeleting

  /** Обработка и валидация редактирования todo */
  const todoUpdate = ({ target, key }) => {
    if (typeof key === 'string' && key !== 'Enter') return
    const todoEditInput = editInput.inputVal
    if (typeof todoEditInput === 'string' && todoEditInput.trim()) {
      const todoEl = target.closest('li')
      const todoId = todoEl.dataset.id
      if (todoEditInput !== todoEl.dataset.title) updateItem(todoId, todoEditInput)
    }
    setEditInput({ editing: null, inputVal: '' })
  }

  /** Автофокус на поле редактирования при нажатии на todo */
  useEffect(() => {
    if (editInput.editing) todoInputRef?.current.focus()
  }, [editInput.editing])

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
              {editInput.editing == id ? ( // группа ввода для редактирования todo
                <div className={styles['input-group']}>
                  <input
                    ref={todoInputRef}
                    type='text'
                    className={styles['todo-item-input']}
                    value={editInput.inputVal}
                    onChange={({ target }) =>
                      setEditInput({ editing: id, inputVal: target.value })
                    }
                    onKeyUp={todoUpdate} // для обработки нажатия Enter
                  />
                  &nbsp;
                  <button
                    className={styles['todo-item-btn'] + ' ' + styles['todo-item-update']}
                    onClick={todoUpdate}
                    disabled={showLoader}
                    title='обновить'
                  >
                    ok
                  </button>
                </div>
              ) : (
                // название todo и кнопка удаления
                <>
                  <span
                    className={styles['todo-item-title']}
                    title='редактировать'
                    onClick={() => setEditInput({ editing: id, inputVal: title })}
                  >
                    {title}
                  </span>
                  &nbsp;
                  <button
                    className={styles['todo-item-btn'] + ' ' + styles['todo-item-remove']}
                    onClick={() => deleteItem(id)}
                    disabled={showLoader}
                    title='удалить'
                  >
                    &times;
                  </button>
                </>
              )}
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
