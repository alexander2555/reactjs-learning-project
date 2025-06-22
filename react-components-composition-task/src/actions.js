export const gameTurn = (isDraw, winner, currentPlayer, field) => ({
  type: 'GAME_TURN',
  payload: {
    isDraw,
    winner,
    currentPlayer,
    field,
  },
})

export const GAME_RESET = {
  type: 'GAME_RESET',
}
