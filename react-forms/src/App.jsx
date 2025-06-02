import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import styles from './App.module.css'
import { useRef } from 'react'

const fieldsSchema = yup.object({
  email: yup.string().required('Email обязателен!').email('Некорректный email'),
  pass: yup
    .string()
    .required('Пароль обязателен!')
    .test(
      'strong-password',
      'Пароль должен содержать строчные и прописные буквы, цифры и символы @$!%*?&',
      value => {
        if (!value) return true
        return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(value)
      },
    ),
  passRepeat: yup
    .string()
    .required('Повтор пароля обязателен!')
    .oneOf([yup.ref('pass')], 'Пароли не совпадают!'),
})

export const App = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(fieldsSchema),
  })

  const { email, pass, passRepeat } = errors

  const filledValues = Object.values(watch()).filter(val => val)
  const errMesssage = Object.values(errors)
    .map(err => err?.message)
    .join('\n')
    .trim()
  const isValid = !errMesssage && filledValues.length === 3

  const submitBtnRef = useRef(null)

  if (isValid) submitBtnRef.current?.focus()

  const onFormSubmit = data => {
    console.log('Send data:', data)
  }

  return (
    <div className={styles.app}>
      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        {errMesssage && <p className={styles['error-label']}>{errMesssage}</p>}
        <input
          name='email'
          type='email'
          placeholder='Email'
          aria-invalid={email ? 'true' : 'false'}
          {...register('email')}
        />
        <input
          name='pass'
          type='password'
          placeholder='Пароль'
          aria-invalid={pass ? 'true' : 'false'}
          {...register('pass')}
        />
        <input
          name='passRepeat'
          type='password'
          placeholder='Пароль ещё раз'
          aria-invalid={passRepeat ? 'true' : 'false'}
          {...register('passRepeat')}
        />
        <button
          ref={submitBtnRef}
          type='submit'
          aria-disabled={true}
          // disabled={valError}
          className={`${styles['btn-submit']}${!isValid ? ' ' + styles.disabled : ''}`}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  )
}
