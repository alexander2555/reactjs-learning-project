const firstPlayer = () => (Math.random() < 0.5 ? 'X' : 'O')

export const getInitialState = () => ({
  isDraw: false,
  winner: null,
  currentPlayer: firstPlayer(),
  field: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
})

export const reducer = (state = getInitialState(), action) => {
  const { type, payload } = action

  switch (type) {
    case 'GAME_RESET':
      return getInitialState()
    case 'GAME_TURN':
      return { ...state, ...payload }
    default:
      return state
  }
}
