import styles from './App.module.css'
import { useDispatch } from 'react-redux'

import { Info, Field } from './'
import { GAME_RESET } from '../actions'

export const AppLayout = () => {
  const dispatch = useDispatch()

  const onGameReset = () => {
    dispatch(GAME_RESET)
  }

  return (
    <div className={styles.app}>
      <Info />
      <Field />
      <button className={styles['restart-btn']} onClick={onGameReset}>
        Начать заново
      </button>
    </div>
  )
}
