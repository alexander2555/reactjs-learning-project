import styles from '../../MainPage.module.css'

import { Button, InputGroup } from '../../../../components'

export const PanelTop = ({
  showLoader,
  todos,
  filteredTodos,
  panelTopState,
  addItem,
}) => {
  const { todoInput, setTodoInput, searchInput, setSearchInput, setSortInput } =
    panelTopState

  return (
    <>
      {/** Добавление Todo */}
      <InputGroup>
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
        <Button
          onClick={() => addItem(todoInput)}
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
            className={styles['todo-item-input']}
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
          <label htmlFor='sortBtn'>Сортировка</label>
          <input
            id='sortBtn'
            type='checkbox'
            className={styles['todo-item-cb']}
            onClick={({ target }) => setSortInput(target.checked)}
            disabled={showLoader}
          />
        </InputGroup>
      )}
    </>
  )
}
