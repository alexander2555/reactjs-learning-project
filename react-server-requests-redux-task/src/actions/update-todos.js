import { fetchItems } from '../api'

export const updateTodosFromServer = dispatch => {
  dispatch({ type: 'SHOW_LOADER' })
  fetchItems.then(todos => {
    dispatch({
      type: 'UPDATE_TODOS',
      payload: todos,
    })
    dispatch({ type: 'HIDE_LOADER' })
  })
}
