import { useState } from 'react'

/**
 * Управление состоянием
 *
 * @param {Object} initialState - начальное состояние
 *
 * @returns {Object} - Объект с методами управления состоянием
 */
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
