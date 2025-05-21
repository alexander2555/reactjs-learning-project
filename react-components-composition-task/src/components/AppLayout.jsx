import styles from './App.module.css'

import { Info } from './Info/Info'
import { Field } from './Field/Field'

export const AppLayout = ({ gameState, setGameState, restartGame }) => {
  return (
    <div className={styles.app}>
      <Info {...gameState} />
      <Field {...gameState} setGameState={setGameState} />
      <button className={styles['restart-btn']} onClick={restartGame}>
        Начать заново
      </button>
    </div>
  )
}
