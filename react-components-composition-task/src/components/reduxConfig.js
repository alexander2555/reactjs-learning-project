import { createStore } from 'redux'

const firstPlayer = () => (Math.random() < 0.5 ? 'X' : 'O')

const getInitGameState = () => ({
  isDraw: false,
  winner: null,
  currentPlayer: firstPlayer(),
  field: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
})

function counterReducer(state = getInitGameState(), action) {
  switch (action.type) {
    case 'game/init':
      return getInitGameState()
    case 'game/turn':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export const store = createStore(counterReducer)
