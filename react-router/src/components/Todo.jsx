import { useEffect, useState, useRef } from 'react'
import { useGetItem, useUpdateItem, useDeleteItem } from '../hooks'
import { NavLink, useParams, useNavigate } from 'react-router-dom'

import styles from '../App.module.css'

export const Todo = () => {
  const { id } = useParams()

  const [editInput, setEditInput] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const { todo, setTodo, isLoading } = useGetItem(id)
  const { updateItem, isUpdating } = useUpdateItem(setTodo)
  const { deleteItem, isDeleting } = useDeleteItem(setTodo)
  const navigate = useNavigate()

  const showLoader = isLoading || isUpdating || isDeleting
  const title = todo[0]?.title

  /** Реф на поле редактирования для автофокуса */
  const todoInputRef = useRef(null)

  /** Обработка и валидация редактирования todo */
  const todoUpdate = ({ target, key }) => {
    if (typeof key === 'string' && key !== 'Enter') return
    if (typeof editInput === 'string' && editInput.trim()) {
      if (editInput !== title) updateItem(id, editInput)
    }
    setEditInput('')
    setIsEditing(false)
  }

  /** Автофокус на поле редактирования при нажатии на todo */
  useEffect(() => {
    if (isEditing) {
      setEditInput(title)
      todoInputRef?.current.focus()
    }
  }, [isEditing])

  return (
    <>
      {showLoader && <div className={styles.loader}></div>}
      <h1>Todo {id}</h1>
      {isEditing ? ( // группа ввода для редактирования todo
        <div className={styles['input-group']}>
          <input
            ref={todoInputRef}
            type='text'
            name='title'
            className={styles['todo-item-input']}
            value={editInput}
            onChange={({ target }) => setEditInput(target.value)}
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
        <div className={styles['todo-item']}>
          <span
            className={styles['todo-item-title']}
            title='редактировать'
            onClick={() => setIsEditing(true)}
          >
            {title}
          </span>
          &nbsp;
          <button
            className={styles['todo-item-btn'] + ' ' + styles['todo-item-remove']}
            onClick={() => {
              deleteItem(id)
              navigate('/', { replace: true })
            }}
            title='удалить'
          >
            &times;
          </button>
        </div>
      )}
      <NavLink to='/' className={styles['nav-link']}>
        &larr;&nbsp;Todo List
      </NavLink>
    </>
  )
}
