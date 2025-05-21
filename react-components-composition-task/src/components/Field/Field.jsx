import { FieldLayout } from './FieldLayout'

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

export const Field = ({ isDraw, winner, field, currentPlayer, setGameState }) => {
  const cellClick = (i, j) => {
    field[i][j] = currentPlayer
    const haveWinner = isWin(field)
    const nextPlayer = !winner ? (currentPlayer === 'X' ? 'O' : 'X') : currentPlayer
    setGameState({
      isDraw: isFieldFull(field) && !haveWinner,
      winner: haveWinner ? currentPlayer : null,
      currentPlayer: nextPlayer,
      field,
    })
  }

  return (
    <FieldLayout isGameEnded={isDraw || winner} field={field} onCellClick={cellClick} />
  )
}
