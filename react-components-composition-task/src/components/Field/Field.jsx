import { FieldLayout } from "./FieldLayout"

export const Field = ({ gameState, setGameState }) => {

  return (
    <FieldLayout {...gameState} setGameState={setGameState} />
  )
}