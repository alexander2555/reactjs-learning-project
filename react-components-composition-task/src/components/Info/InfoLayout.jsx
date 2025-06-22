import styles from './Info.module.css'
import { useSelector } from 'react-redux'

export const InfoLayout = () => {
  const isDraw = useSelector(state => state.isDraw)
  const winner = useSelector(state => state.winner)
  const currentPlayer = useSelector(state => state.currentPlayer)

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
