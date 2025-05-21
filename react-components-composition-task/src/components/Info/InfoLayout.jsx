import PropTypes from 'prop-types'
import styles from './Info.module.css'

export const InfoLayout = ({ currentPlayer, winner, isDraw }) => {
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

InfoLayout.propTypes = {
  isDraw: PropTypes.bool,
  winner: PropTypes.string,
  currentPlayer: PropTypes.string.isRequired,
}
