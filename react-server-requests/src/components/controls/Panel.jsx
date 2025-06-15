import { useState, useContext } from 'react'
import { AppContext } from '../../context.js'
import { useAddItem } from '../../hooks'
import { Button, InputGroup } from './'
import { Checkbox } from './checkbox/Checkbox.jsx'

export const Panel = () => {
  const {
    isLoading,
    filteredTodos,
    todos,
    setTodos,
    searchInput,
    setSearchInput,
    setSortInput,
  } = useContext(AppContext)

  const [todoInput, setTodoInput] = useState('')
  const { addItem, isCreating } = useAddItem(setTodos, setTodoInput)

  return (
    <>
      {/** Добавление Todo */}
      <InputGroup>
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
          disabled={isLoading || isCreating || !todoInput}
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
            type='text'
            value={searchInput}
            onChange={({ target }) => setSearchInput(target.value)}
            placeholder='Поиск todo'
          />
          &nbsp;
          {searchInput && <span>({filteredTodos.length})</span>}
        </InputGroup>
      )}
      {/** Сортировка Todo */}
      {todos.length > 1 && (
        <InputGroup>
          <hr />
          <Checkbox
            id={'sortBtn'}
            label={'Сортировка'}
            onClick={({ target }) => setSortInput(target.checked)}
            disabled={isLoading || isCreating}
          />
        </InputGroup>
      )}
    </>
  )
}
