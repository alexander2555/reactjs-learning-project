import { useState } from 'react'

import { AppLayout } from './components/AppLayout'

const firstPlayer = () => Math.random() < .5 ? 'X' : 'O'

export const App = () => {
  
  const initGameState = {
    currentPlayer: firstPlayer(),
    info: 'initGame',
    field: [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  }
  const [gameState, setGameState] = useState(initGameState)

  return (
    <AppLayout gameState={gameState} setGameState={setGameState} />
  )
}
