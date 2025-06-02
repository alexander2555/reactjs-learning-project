import { useEffect, useRef, useState } from 'react'
import { useGetItems, useAddItem, useUpdateItem, useDeleteItem } from './hooks'

import styles from './App.module.css'

const initialEdit = {
  editing: null,
  inputVal: '',
}

export const App = () => {
  const [todoInput, setTodoInput] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [sortInput, setSortInput] = useState(false)
  const [editInput, setEditInput] = useState(initialEdit)

  const todoInputRef = useRef(null)

  const { todos, filteredTodos, setTodos, isLoading } = useGetItems(
    searchInput,
    sortInput,
  )

  const { addItem, isCreating } = useAddItem(setTodos, setTodoInput)
  const { updateItem, isUpdating } = useUpdateItem(setTodos)
  const { deleteItem, isDeleting } = useDeleteItem(setTodos)

  const showLoader = isCreating || isLoading || isUpdating || isDeleting

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

  useEffect(() => {
    if (editInput.editing) todoInputRef?.current.focus()
  }, [editInput.editing])

  return (
    <div className={styles.app}>
      <h1>Todo list ({todos.length})</h1>
      {/** Добавление Todo */}
      <div className={styles['input-group']}>
        <hr />
        <input
          type='text'
          value={todoInput}
          onChange={({ target }) => setTodoInput(target.value)}
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
                  onKeyUp={todoUpdate}
                />
                &nbsp;
                <button
                  className={styles['todo-item-btn'] + ' ' + styles['todo-item-update']}
                  onClick={todoUpdate}
                  disabled={showLoader}
                  title='обновить'
                >
                  v
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

      {showLoader && <div className={styles.loader}></div>}
    </div>
  )
}
