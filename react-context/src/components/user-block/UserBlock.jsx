import { UserPersonalInfo, UserContacts } from './components'

export const UserBlock = ({ name, age, email, phone }) => {
  return (
    <div>
      <h2>Пользователь</h2>
      <UserPersonalInfo name={name} age={age} />
      <UserContacts email={email} phone={phone} />
    </div>
  )
}