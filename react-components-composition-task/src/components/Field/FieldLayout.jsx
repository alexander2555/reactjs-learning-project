import styles from './Field.module.css'

export const FieldLayout = ({ currentPlayer, isGameEnded, field, onCellClick }) => {
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
