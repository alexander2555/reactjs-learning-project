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

export const App = () => {
  const userData = getUserFromServer()

  return (
    <AppContext value={userData}>
      <div className={styles.app}>
        <Header />
        <hr />
        <UserBlock />
      </div>
    </AppContext>
  )
}
