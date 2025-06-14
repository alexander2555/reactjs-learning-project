import { use } from 'react'
import { AppContext } from '../../../../context'

export const UserContacts = () => {
  const { userData } = use(AppContext)
  const { email, phone } = userData
  return (
    <div>
      <h3>Контакты</h3>
      <div>Почта: {email}</div>
      <div>Телефон: {phone}</div>
    </div>
  )
}
