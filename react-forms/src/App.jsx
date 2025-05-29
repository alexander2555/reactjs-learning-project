import { useStore } from './useStore'
import styles from './App.module.css'
import { useState, useRef } from 'react'

const initialState = {
  email: '',
  pass: '',
  passRepeat: '',
}
const initialValidationState = {
  ok: false,
  valErrors: '',
}
const validateForm = ({ email, pass, passRepeat }) => {
  const errors = []

  console.log(email, pass, passRepeat)

  const emptyFields = !(email && pass && passRepeat)
  if (emptyFields) {
    errors.push('Все поля формы должны быть заполнены!')
  } else {
    const emailRegex = /^\w+@[a-zA-Z]+\.[a-z]{2,}$/
    const passRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/

    if (email && !emailRegex.test(email)) {
      errors.push('Адрес email некорректен!')
    }

    if (pass) {
      if (passRepeat && pass !== passRepeat) {
        errors.push('Пароли не совпадают!')
      }

      if (pass.length < 4) {
        errors.push('Пароль короче 4-х символов')
      }

      if (!passRegex.test(pass)) {
        errors.push(
          'Пароль должен содержать строчные и прописные буквы, цифры и символы @$!%*?&',
        )
      }
    }
  }

  return { valOk: !errors.length, valErrors: errors.join('\n') }
}

export const App = () => {
  const { getState, updateState } = useStore(initialState)
  const [valState, setValError] = useState(initialValidationState)

  const { email, pass, passRepeat } = getState()

  const submitBtnRef = useRef(null)

  const onChangeField = ({ target }) => {
    updateState({ [target.name]: target.value })
    const { valOk } = validateForm({
      ...getState(),
      [target.name]: target.value,
    })
    if (valOk) {
      setValError(initialValidationState)
      submitBtnRef.current.focus()
    }
  }
  const onBlurField = ({ target }) => {
    // const passfields = {
    //   pass: getState().pass,
    //   passRepeat: getState().passRepeat,
    // }
    setValError(
      validateForm({
        ...getState(),
        [target.name]: target.value,
      }),
    )
  }

  const onFormSubmit = e => {
    e.preventDefault()
    console.log('Send data:', getState())
  }

  return (
    <div className={styles.app}>
      <form onSubmit={onFormSubmit} noValidate>
        {!valState.valOk && <p className={styles['error-label']}>{valState.valErrors}</p>}
        <input
          name='email'
          type='email'
          value={email}
          onChange={onChangeField}
          onBlur={onBlurField}
          placeholder='Email'
        />
        <input
          name='pass'
          type='password'
          value={pass}
          onChange={onChangeField}
          onBlur={onBlurField}
          placeholder='Пароль'
        />
        <input
          name='passRepeat'
          type='password'
          value={passRepeat}
          onChange={onChangeField}
          onBlur={onBlurField}
          placeholder='Пароль ещё раз'
        />
        <button
          ref={submitBtnRef}
          type='submit'
          aria-disabled={!valState.valOk}
          // disabled={valError}
          className={`${styles['btn-submit']}${!valState.valOk ? ' ' + styles.disabled : ''}`}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  )
}
