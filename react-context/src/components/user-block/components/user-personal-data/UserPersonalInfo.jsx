import { useContext } from 'react'
import { AppContext } from '../../../../context'

export const UserPersonalInfo = () => {
  const { userData, dispatch } = useContext(AppContext)
  const { name, age } = userData

  return (
    <div>
      <h3>Персональные данные</h3>
      <div>Имя: {name}</div>
      <div>Возраст: {age}</div>
    </div>
  )
}
