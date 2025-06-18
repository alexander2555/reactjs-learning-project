import styles from './Info.module.css'
import { store } from '../reduxConfig'

export const InfoLayout = () => {
  const { currentPlayer, winner, isDraw } = store.getState()

  return (
    <div className={styles.info}>
      {winner && (
        <span style={{ color: winner === 'X' ? 'red' : 'blue' }}>
          Победа игрока:&nbsp;
          <strong>{winner}</strong>
        </span>
      )}
      {isDraw && <span style={{ color: 'lightgreen' }}>Ничья!</span>}
      {!(isDraw || winner) && (
        <span>
          Ход игрока:&nbsp;
          <strong style={{ color: currentPlayer === 'X' ? 'red' : 'blue' }}>
            {currentPlayer}
          </strong>
        </span>
      )}
    </div>
  )
}
