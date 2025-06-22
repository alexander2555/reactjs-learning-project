import styles from './Field.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { gameTurn } from '../../actions'

const isFieldFull = field => field.every(r => r.every(c => c))
const isRowWin = rows => rows.some(r => r.every(c => c.length && c === r[0]))

const isWin = rows => {
  if (isRowWin(rows)) return true

  const cols = [[], [], []]
  rows.forEach((row, i) => {
    row.forEach((cell, j) => {
      cols[j].push(cell)
    })
  })
  if (isRowWin(cols)) return true

  const diags = [
    [rows[0][0], rows[1][1], rows[2][2]],
    [rows[0][2], rows[1][1], rows[2][0]],
  ]
  if (isRowWin(diags)) return true

  return false
}

export const Field = () => {
  const field = useSelector(state => state.field)
  const currentPlayer = useSelector(state => state.currentPlayer)
  const winner = useSelector(state => state.winner)
  const isDraw = useSelector(state => state.isDraw)

  const isGameEnded = isDraw || winner

  const dispatch = useDispatch()

  const onCellClick = (i, j) => {
    field[i][j] = currentPlayer
    const haveWinner = isWin(field)
    const nextPlayer = !winner ? (currentPlayer === 'X' ? 'O' : 'X') : currentPlayer
    dispatch(
      gameTurn(
        isFieldFull(field) && !haveWinner,
        haveWinner ? currentPlayer : null,
        nextPlayer,
        field,
      ),
    )
  }

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
