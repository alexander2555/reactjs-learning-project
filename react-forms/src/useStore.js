import { useState } from 'react'

export const useStore = initialState => {
  const [state, setState] = useState(initialState)
  return {
    getState: () => state,
    updateState: newState =>
      setState({
        ...state,
        ...newState,
      }),
    resetState: () => setState(initialState),
  }
}
