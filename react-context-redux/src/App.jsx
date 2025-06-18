import { useEffect } from 'react'
import styles from './App.module.css'

import { Header, UserBlock } from './components'
import { store } from './store'

const getUserFromServer = () => ({
  id: 'a1001',
  name: 'Иван',
  age: 25,
  email: 'ivan@mail.ru',
  phone: '+7999-999-99-99',
})

export const App = () => {
  useEffect(() => {
    store.dispatch({ type: 'SET_USER_DATA', payload: getUserFromServer() })
  }, [])

  return (
    <div className={styles.app}>
      <Header />
      <hr />
      <UserBlock />
    </div>
  )
}
