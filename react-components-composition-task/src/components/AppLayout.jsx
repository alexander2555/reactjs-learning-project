import styles from './App.module.css'
import { store } from '../components/reduxConfig'

import { Info } from './Info/Info'
import { Field } from './Field/Field'

const restartGame = () => {
  store.dispatch({ type: 'game/init' })
}

export const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Info />
      <Field />
      <button className={styles['restart-btn']} onClick={restartGame}>
        Начать заново
      </button>
    </div>
  )
}
