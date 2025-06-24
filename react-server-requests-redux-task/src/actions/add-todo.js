import { postItem } from '../api'

export const addTodoToServer = title => dispatch => {
  dispatch({ type: 'SHOW_LOADER' })
  postItem(title).then(newTodo => {
    dispatch({
      type: 'ADD_TODO',
      payload: newTodo,
    })
    dispatch({ type: 'HIDE_LOADER' })
  })
}
