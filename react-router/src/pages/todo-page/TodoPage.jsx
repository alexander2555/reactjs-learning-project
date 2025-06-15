import styles from './TodoPage.module.css'

import { useEffect, useState, useRef } from 'react'
import { useGetItem, useUpdateItem, useDeleteItem } from '../../hooks'
import { NavLink, useParams, useNavigate } from 'react-router-dom'

import { Button, InputGroup, Loader } from '../../components'

export const Todo = () => {
  const { id } = useParams()

  /** Состояния для режима редактирования */
  const [editInput, setEditInput] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  /** Хуки CRUD для одного todo */
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
      {showLoader && <Loader />}
      <h1>Todo {id}</h1>
      {isEditing ? ( // группа ввода для редактирования todo
        <InputGroup>
          <textarea
            ref={todoInputRef}
            type='text'
            name='title'
            className={styles['todo-item-input']}
            value={editInput}
            onChange={({ target }) => setEditInput(target.value)}
            onKeyUp={todoUpdate} // для обработки нажатия Enter
          />
          &nbsp;
          <Button ownClass={'todo-item-update'} onClick={todoUpdate} title='обновить'>
            ok
          </Button>
        </InputGroup>
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
          <Button
            ownClass={'todo-item-remove'}
            onClick={() => {
              deleteItem(id)
              navigate('/', { replace: true })
            }}
            title='удалить'
          >
            &times;
          </Button>
        </div>
      )}
      <NavLink to='/' className={styles['nav-link']}>
        &larr;&nbsp;Todo List
      </NavLink>
    </>
  )
}
