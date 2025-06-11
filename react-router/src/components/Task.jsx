import { useEffect, useState, useRef } from 'react'

import styles from '../App.module.css'

const initialEdit = {
  editing: null,
  inputVal: '',
}

export const Task = ({ id, title, updateItem }) => {
  const [editInput, setEditInput] = useState(initialEdit)

  /** Реф на поле редактирования для автофокуса */
  const todoInputRef = useRef(null)

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
    <>
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
            title='удалить'
          >
            &times;
          </button>
        </>
      )}
    </>
  )
}
