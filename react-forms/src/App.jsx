import { useState } from 'react'
import styles from './App.module.css'

const initialState = {
  email: '',
  pass: '',
  passRepeat: '',
}

export const App = () => {
  const [formState, setFormState] = useState(initialState)

  const onFormSubmit = e => {
    e.preventDefault()
    console.log('Send data:', formState)
  }

  const onChangeEmail = ({ target }) =>
    setFormState({
      ...formState,
      email: target.value,
    })
  const onChangePass = ({ target }) =>
    setFormState({
      ...formState,
      pass: target.value,
    })
  const onChangePassRep = ({ target }) =>
    setFormState({
      ...formState,
      passRepeat: target.value,
    })

  return (
    <div className={styles.app}>
      <form onSubmit={onFormSubmit}>
        <input
          type='email'
          value={formState.email}
          onChange={onChangeEmail}
          placeholder='Email'
        />
        <input
          type='password'
          value={formState.pass}
          onChange={onChangePass}
          placeholder='Пароль'
        />
        <input
          type='password'
          value={formState.passRepeat}
          onChange={onChangePassRep}
          placeholder='Пароль ещё раз'
        />
        <button type='submit'>Отправить</button>
      </form>
    </div>
  )
}
