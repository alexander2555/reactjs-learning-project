import { use } from 'react'
import { AppContext } from '../../../../context'

export const CurrentUser = () => {
  const { name } = use(AppContext)
  return (
    <div>
      <div>Текущий пользователь: {name}</div>
    </div>
  )
}
