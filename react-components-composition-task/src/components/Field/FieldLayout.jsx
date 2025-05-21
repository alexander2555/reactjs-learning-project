import styles from './Field.module.css'

export const FieldLayout = ({ field, currentPlayer, setGameState }) => {
  const cellClick = (i, j) => {
    field[i][j] = currentPlayer
    setGameState({
      currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
      field,
    })
  }

  return (
    <div className={styles.field}>
      {field.map((row, i) =>
        row.map((cell, j) => (
          <button
            onClick={() => cellClick(i, j)}
            key={i * 10 + j}
            disabled={field[i][j].length}
          >
            {cell}
          </button>
        )),
      )}
    </div>
  )
}
