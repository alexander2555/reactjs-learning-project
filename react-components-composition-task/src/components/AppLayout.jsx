import styles from './App.module.css'

import { Info } from './Info/Info'
import { Field } from './Field/Field'

export const AppLayout = ({ gameState, setGameState }) => {
  return (
    <div className={styles.app}>
      <Info currentPlayer={gameState.currentPlayer} />
      <Field gameState={gameState} setGameState={setGameState} />
    </div>
  )
}
