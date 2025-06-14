import { use } from 'react'
import { AppContext } from '../../../../context'

export const CurrentUser = () => {
  const { userData, dispatch } = use(AppContext)
  const { name } = userData

  return (
    <div>
      <div>Текущий пользователь: {name}</div>
      <button
        onClick={() =>
          dispatch({
            type: 'SET_USER_DATA',
            payload: { ...userData, name: 'новый' },
          })
        }
      >
        Обновить
      </button>
    </div>
  )
}
