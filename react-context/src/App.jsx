import styles from './App.module.css'

import { Header, UserBlock } from './components'

const getUserFromServer = () => (
  {
    id: 'a1001',
    name: 'Иван',
    age: 25,
    email: 'ivan@mail.ru',
    phone: '+7999-999-99-99',
  }
)

export const App = () => {
  const { name, age, email, phone } = getUserFromServer();

  return (
    <div className={styles.app}>
      <Header currentUser={name} />
      <hr />
      <UserBlock name={name} age={age} email={email} phone={phone} />
    </div>
  )
}
