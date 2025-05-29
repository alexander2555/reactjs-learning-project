import { useStore } from './useStore'
import styles from './App.module.css'

const initialState = {
  email: '',
  pass: '',
  passRepeat: '',
}

export const App = () => {
  const { getState, updateState } = useStore(initialState)

  const { email, pass, passRepeat } = getState()

  const onChangeField = ({ target }) => updateState({ [target.name]: target.value })

  const onFormSubmit = e => {
    e.preventDefault()
    console.log('Send data:', getState())
  }

  return (
    <div className={styles.app}>
      <form onSubmit={onFormSubmit}>
        <input
          name='email'
          type='email'
          value={email}
          onChange={onChangeField}
          placeholder='Email'
        />
        <input
          name='pass'
          type='password'
          value={pass}
          onChange={onChangeField}
          placeholder='Пароль'
        />
        <input
          name='passRepeat'
          type='password'
          value={passRepeat}
          onChange={onChangeField}
          placeholder='Пароль ещё раз'
        />
        <button type='submit'>Зарегистрироваться</button>
      </form>
    </div>
  )
}
