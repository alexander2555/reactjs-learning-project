import styles from './Panel.module.css'

import { useState } from 'react'
import { useAddItem } from '../../hooks'
import { Button } from './button/Button'

export const Panel = ({ showLoader, panelState, todosState, filteredTodos }) => {
  const { todos, setTodos } = todosState

  const [todoInput, setTodoInput] = useState('')
  const { addItem, isCreating } = useAddItem(setTodos, setTodoInput)

  const { searchInput, setSearchInput, setSortInput } = panelState
  return (
    <>
      {/** Добавление Todo */}
      <div className={styles['input-group']}>
        <hr />
        <input
          type='text'
          value={todoInput}
          onChange={({ target }) => setTodoInput(target.value)}
          onKeyUp={({ key }) => (key === 'Enter' ? addItem(todoInput) : false)} // для обработки нажатия Enter
          placeholder='Новое todo'
        />
        &nbsp;
        <Button
          onClick={() => addItem(todoInput)}
          disabled={showLoader || isCreating || !todoInput}
          title='Добавить todo'
        >
          +
        </Button>
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
            disabled={showLoader || isCreating}
          />
        </div>
      )}
    </>
  )
}
