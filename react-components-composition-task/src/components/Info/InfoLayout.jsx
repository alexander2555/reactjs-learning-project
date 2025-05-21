import styles from './Info.module.css'

export const InfoLayout = ({ currentPlayer, winner, isDraw }) => {
  return (
    <div className={styles.info}>
      {!(winner || isDraw) ? (
        <span>
          Ход игрока:&nbsp;
          <strong style={{ color: currentPlayer === 'X' ? 'red' : 'blue' }}>
            {currentPlayer}
          </strong>
        </span>
      ) : winner ? (
        <span style={{ color: winner === 'X' ? 'red' : 'blue' }}>
          Победа игрока:&nbsp;
          <strong>{winner}</strong>
        </span>
      ) : (
        <span style={{ color: 'lightgreen' }}>Ничья!</span>
      )}
    </div>
  )
}
