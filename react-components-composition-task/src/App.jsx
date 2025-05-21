import { useState } from 'react'

import { AppLayout } from './components/AppLayout'

const firstPlayer = () => (Math.random() < 0.5 ? 'X' : 'O')

export const App = () => {
  const initGameState = {
    isDraw: false,
    winner: null,
    currentPlayer: firstPlayer(),
    info: 'initGame',
    field: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
  }
  const [gameState, setGameState] = useState(initGameState)

  return <AppLayout gameState={gameState} setGameState={setGameState} />
}
