import { delItem } from '../api'

export const removeTodoFromServer = id => dispatch => {
  dispatch({ type: 'SHOW_LOADER' })
  delItem(id).then(() => {
    dispatch({
      type: 'REMOVE_TODO',
      payload: id,
    })
    dispatch({ type: 'HIDE_LOADER' })
  })
}
