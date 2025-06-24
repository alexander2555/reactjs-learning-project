import styles from '../Controls.module.css'

import { debounce } from '../../../utils'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  sortTodoCheckboxSel,
  searchTodoInputSel,
  todoInputSel,
  showLoaderSel,
} from '../../../selectors'
import {
  addTodoToServer,
  addTodoInputChange,
  searchTodoInputChange,
  SORT_TODO_CHECKBOX_TOGGLE,
} from '../../../actions'
import { Button, InputGroup } from '../../'

const debounceDispatch = debounce((dispatch, action) => dispatch(action), 200)

export const PanelTop = ({ filteredTodos }) => {
  const dispatch = useDispatch()

  const todos = useSelector(state => state.todosState.todos)

  const todoInput = useSelector(todoInputSel)
  const searchInput = useSelector(searchTodoInputSel)
  const sortCheckbox = useSelector(sortTodoCheckboxSel)
  const showLoader = useSelector(showLoaderSel)

  const addItem = () => {
    /** ADD_TODO_INPUT_CHANGE */
    dispatch(addTodoInputChange(''))
    /** ADD_TODO */
    dispatch(addTodoToServer(todoInput))
  }

  useEffect(() => {
    debounceDispatch(dispatch, { type: 'FILTER_TODOS', payload: searchInput })
  }, [searchInput])
  useEffect(() => {
    debounceDispatch(dispatch, { type: 'SORT_TODOS', payload: sortCheckbox })
  }, [sortCheckbox])

  return (
    <>
      {/** Добавление Todo */}
      <InputGroup>
        <hr />
        <input
          className={styles['input']}
          type='text'
          value={todoInput}
          onChange={({ target }) => dispatch(addTodoInputChange(target.value))} //** ADD_TODO_INPUT_CHANGE */
          onKeyUp={({ key }) => (key === 'Enter' ? addItem() : false)} // для обработки нажатия Enter
          placeholder='Новое todo'
        />
        &nbsp;
        <Button
          onClick={addItem}
          disabled={showLoader || !todoInput}
          title='Добавить todo'
        >
          +
        </Button>
      </InputGroup>
      {/** Поиск (фильтр) Todo */}
      {todos.length > 1 && (
        <InputGroup>
          <hr />
          <input
            className={styles['input']}
            type='text'
            value={searchInput}
            onChange={({ target }) => dispatch(searchTodoInputChange(target.value))} //** SEARCH_TODO_INPUT_CHANGE */
            placeholder='Поиск todo'
          />
          &nbsp;
          {searchInput && <span>({filteredTodos.length})</span>}
        </InputGroup>
      )}
      {/** Сортировка Todo */}
      {filteredTodos.length > 1 && (
        <InputGroup>
          <hr />
          <label htmlFor='sortBtn'>Сортировка</label>
          <input
            id='sortBtn'
            type='checkbox'
            checked={sortCheckbox}
            className={styles['todo-item-cb']}
            onChange={() => dispatch(SORT_TODO_CHECKBOX_TOGGLE)}
            disabled={showLoader}
          />
        </InputGroup>
      )}
    </>
  )
}
