import styles from './Todo.module.css'

import { useSelector, useDispatch } from 'react-redux'
import { useRef, useEffect } from 'react'
import { editTodoIndexSel, editTodoInputSel, showLoaderSel } from '../../selectors'
import {
  editTodoIndex,
  editTodoInputChange,
  removeTodoFromServer,
  updateTodoToServer,
} from '../../actions'

import { Button, InputGroup } from '../'

export const Todo = ({ id, title }) => {
  const dispatch = useDispatch()

  const editIndex = useSelector(editTodoIndexSel)
  const editInput = useSelector(editTodoInputSel)
  const showLoader = useSelector(showLoaderSel)

  const todoInputRef = useRef(null)

  const startEditing = () => {
    /** EDIT_TODO_INDEX */
    dispatch(editTodoIndex(id))
    /** EDIT_TODO_INPUT_CHANGE */
    dispatch(editTodoInputChange(title))
  }

  /** Автофокус при редактировании */
  useEffect(() => {
    if (editIndex === id) todoInputRef?.current.focus()
  }, [editIndex])

  const updateItem = () => {
    if (typeof editInput === 'string' && editInput.trim()) {
      if (editInput !== title) {
        /** CHANGE_TODO */
        dispatch(updateTodoToServer(id, editInput))
      }
    }
    /** EDIT_TODO_INDEX */
    dispatch(editTodoIndex(null))
    /** EDIT_TODO_INPUT_CHANGE */
    dispatch(editTodoInputChange(''))
  }

  return (
    <li data-id={id} data-title={title} className={styles['todo-item']}>
      {editIndex === id ? ( // группа ввода для редактирования todo
        <InputGroup ownClass={styles['input-group']}>
          <textarea
            ref={todoInputRef}
            className={styles['input']}
            value={editInput}
            onChange={({ target }) => {
              dispatch(editTodoInputChange(target.value))
            }} /** EDIT_TODO_INPUT_CHANGE */
            onKeyDown={e => (e.key === 'Enter' ? e.preventDefault() : false)}
            onKeyUp={({ key }) => (key === 'Enter' ? updateItem() : false)}
          />
          &nbsp;
          <Button
            ownClass='todo-item-update'
            onClick={updateItem}
            disabled={showLoader}
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
            onClick={startEditing}
          >
            {title}
          </span>
          &nbsp;
          <Button
            ownClass='todo-item-remove'
            onClick={() => {
              /** REMOVE_TODO */
              dispatch(removeTodoFromServer(id))
            }}
            disabled={showLoader}
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
