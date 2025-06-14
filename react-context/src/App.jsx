import { useEffect, useState } from 'react'
import styles from './App.module.css'

import { Header, UserBlock } from './components'
import { AppContext } from './context'

const getUserFromServer = () => ({
  id: 'a1001',
  name: 'Иван',
  age: 25,
  email: 'ivan@mail.ru',
  phone: '+7999-999-99-99',
})

const reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'SET_USER_DATA': {
      return { ...state, ...payload }
    }
    case 'SET_USER_AGE': {
      return { ...state, age: payload }
    }
    default:
      return state
  }
}

export const App = () => {
  const [userData, setUserData] = useState({})

  const dispatch = action => {
    const newState = reducer(userData, action)

    setUserData(newState)
  }

  useEffect(() => {
    setUserData(getUserFromServer())
  }, [])

  return (
    <AppContext value={{ userData, dispatch }}>
      <div className={styles.app}>
        <Header />
        <hr />
        <UserBlock />
      </div>
    </AppContext>
  )
}
