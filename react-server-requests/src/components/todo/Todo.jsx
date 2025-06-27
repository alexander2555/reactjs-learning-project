import { useRef, useEffect, useState } from 'react'
import { useUpdateItem, useDeleteItem } from '../../hooks'
import { Button, InputGroup } from '../controls'

import styles from './Todo.module.css'

const initialEdit = {
  editing: null,
  inputVal: '',
}

export const Todo = ({ id, title, showLoader, setTodos }) => {
  const [editInput, setEditInput] = useState(initialEdit)

  const todoInputRef = useRef(null)

  const { updateItem, isUpdating } = useUpdateItem(setTodos)
  const { deleteItem, isDeleting } = useDeleteItem(setTodos)

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
    <li data-id={id} data-title={title} className={styles['todo-item']}>
      {editInput.editing == id ? ( // группа ввода для редактирования todo
        <InputGroup>
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
          <Button
            ownClass='todo-item-update'
            onClick={todoUpdate}
            disabled={showLoader || isUpdating || isDeleting}
            title='обновить'
          >
            ok
          </Button>
        </InputGroup>
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
          <Button
            ownClass='todo-item-remove'
            onClick={() => deleteItem(id)}
            disabled={showLoader || isUpdating || isDeleting}
            title='удалить'
          >
            &times;
          </Button>
        </>
      )}
      <hr />
    </li>
  )
}
