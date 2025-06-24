import styles from './App.module.css'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showLoaderSel } from './selectors'
import { Todo, PanelTop, PanelBottom } from './components'
import { updateTodosFromServer } from './actions'

Array.prototype.filterTodos = function (phrase) {
  return typeof phrase === 'string' && phrase.trim()
    ? [...this].filter(t => t.title.includes(phrase))
    : this
}

Array.prototype.sortTodos = function (isSort) {
  return isSort && this.length > 1
    ? [...this].sort((t1, t2) => (t1.title < t2.title ? -1 : 0))
    : this
}

export const App = () => {
  const dispatch = useDispatch()

  const todos = useSelector(state => state.todosState.todos)
  const showLoader = useSelector(showLoaderSel)

  useEffect(() => {
    dispatch(updateTodosFromServer)
  }, [])

  const sortTodos = useSelector(state => state.viewState.sort)
  const searchTodos = useSelector(state => state.viewState.search)

  const filteredTodos = todos.filterTodos(searchTodos)

  return (
    <div className={styles.app}>
      <h1>Todo list ({todos.length})</h1>

      {/** Панель добавления, поиска и сортировки */}
      <PanelTop filteredTodos={filteredTodos} />

      {/** Список Todo */}
      {todos.length ? ( // если есть, что выводить
        <ol className={styles.todos + (showLoader ? ' ' + styles.loading : '')}>
          {filteredTodos.length ? ( // если есть, что выводить при поиске
            filteredTodos
              .sortTodos(sortTodos)
              .map(({ id, title }) => (
                <Todo key={id} id={id} title={title} showLoader={showLoader} />
              ))
          ) : (
            // если нечего выводить при поиске
            <p>Ничего не найдено</p>
          )}
        </ol>
      ) : (
        // если нечего выводить
        <p style={{ textAlign: 'center', flex: '1 1 auto' }}>
          Список todo пуст
          <br />
          Добавь новое todo
        </p>
      )}

      {/** Дополнительные кнопки для работы со всем списком */}
      <PanelBottom />

      {showLoader && <div className={styles.loader}></div>}
    </div>
  )
}
