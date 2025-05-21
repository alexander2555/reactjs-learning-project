import { useState } from 'react'

import { AppLayout } from './components/AppLayout'

const firstPlayer = () => (Math.random() < 0.5 ? 'X' : 'O')

export const App = () => {
  const initGameState = {
    isDraw: false,
    winner: null,
    currentPlayer: firstPlayer(),
    field: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
  }
  const [gameState, setGameState] = useState(initGameState)

  const restartGame = () => {
    setGameState({ ...initGameState })
  }

  return (
    <AppLayout
      gameState={gameState}
      setGameState={setGameState}
      restartGame={restartGame}
    />
  )
}
