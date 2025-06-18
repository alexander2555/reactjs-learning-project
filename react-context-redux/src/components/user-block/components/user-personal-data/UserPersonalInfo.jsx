import { store } from '../../../../store'

export const UserPersonalInfo = () => {
  const { name, age } = store.getState()

  const onUserUpdate = () => {
    const { name, email, phone } = store.getState()
    const newUserData = { name, age: 42, email, phone }

    store.dispatch({ type: 'SET_USER_DATA', payload: newUserData })
  }
  return (
    <div>
      <h3>Персональные данные</h3>
      <div>Имя: {name}</div>
      <div>Возраст: {age}</div>
      <button onClick={onUserUpdate}>Обновить п-ля</button>
    </div>
  )
}
