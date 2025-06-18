import styles from './Field.module.css'
import { store } from '../reduxConfig'

export const FieldLayout = ({ onCellClick }) => {
  const { isDraw, winner, currentPlayer, field } = store.getState()
  const isGameEnded = isDraw || winner
  return (
    <div className={styles.field}>
      {field.map((row, i) =>
        row.map((cell, j) => (
          <button
            style={{
              color: field[i][j] === 'X' ? 'red' : 'blue',
              '--shadow-color': currentPlayer === 'X' ? 'red' : 'blue',
            }}
            className={styles.cell}
            onClick={() => onCellClick(i, j)}
            key={i * 10 + j}
            disabled={field[i][j] || isGameEnded}
          >
            {cell}
          </button>
        )),
      )}
    </div>
  )
}
