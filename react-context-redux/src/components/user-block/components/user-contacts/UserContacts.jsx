import { store } from '../../../../store'

export const UserContacts = () => {
  const { email, phone } = store.getState()

  return (
    <div>
      <h3>Контакты</h3>
      <div>Почта: {email}</div>
      <div>Телефон: {phone}</div>
    </div>
  )
}
