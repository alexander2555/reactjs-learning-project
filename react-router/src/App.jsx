import styles from './App.module.css'

import { Routes, Route, useParams } from 'react-router-dom'
import { MainPage } from './components/MainPage'
import { Todo } from './components/Todo'
const PageNotFound = () => (
  <div>
    <h1>Страница не найдена</h1>ошибка 404
  </div>
)
const TodoNotFound = () => {
  const { id } = useParams()
  return (
    <div>
      <h1>Задача {id} не найдена</h1>
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
