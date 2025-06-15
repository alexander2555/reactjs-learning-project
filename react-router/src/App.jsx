import styles from './App.module.css'

import { Routes, Route, useParams, NavLink } from 'react-router-dom'
import { MainPage } from './pages/main-page/MainPage'
import { Todo } from './pages/todo-page/TodoPage'

const PageNotFound = () => (
  <div>
    <h1>Страница не найдена</h1>ошибка 404
    <div>
      <NavLink to='/' className={styles['nav-link']}>
        &larr;&nbsp;На главную
      </NavLink>
    </div>
  </div>
)

const TodoNotFound = () => {
  const { id } = useParams()
  return (
    <div>
      <h1>Задача {id} не найдена</h1>
      <NavLink to='/' className={styles['nav-link']}>
        &larr;&nbsp;На главную
      </NavLink>
    </div>
  )
}

export const App = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<MainPage />} />

        <Route path='/task/:id' element={<Todo />} />

        <Route path='/task-not-found/:id' element={<TodoNotFound />} />

        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  )
}
