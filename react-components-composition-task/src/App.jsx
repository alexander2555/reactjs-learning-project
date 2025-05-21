import { useState } from 'react'

import { AppLayout } from './components/AppLayout'

export const App = () => {
  
  const initGameState = {
    info: 'initGame',
    field: [
      ['1', '', ''],
      ['', '2', ''],
      ['', '', '3']
    ]
  }
  const [gameState, setGameState] = useState(initGameState)

  return (
    <AppLayout gameState={gameState} setGameState={setGameState} />
  )
}
