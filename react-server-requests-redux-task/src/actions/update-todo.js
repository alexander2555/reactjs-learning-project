import { putItem } from '../api'

export const updateTodoToServer = (id, title) => dispatch => {
  dispatch({ type: 'SHOW_LOADER' })
  putItem(id, title).then(updatedTodo => {
    dispatch({
      type: 'UPDATE_TODO',
      payload: updatedTodo,
    })
    dispatch({ type: 'HIDE_LOADER' })
  })
}
