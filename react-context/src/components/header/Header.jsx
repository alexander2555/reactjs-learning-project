import { CurrentUser } from './components'

export const Header = ({ currentUser }) => {
  return (
    <div>
      <div>Информация в шапке приложения</div>
      <CurrentUser currentUser={currentUser} />
    </div>
  )
}