import { delItem } from '../api'

const clearTodos = async todos => {
  for (const todo of todos) {
    console.log('Удаляется todo', await delItem(todo.id), '...')
  }
}

export const clearTodosFromServer = todos => dispatch => {
  dispatch({ type: 'SHOW_LOADER' })
  clearTodos(todos).then(() => {
    dispatch({
      type: 'CLEAR_TODOS',
    })
    dispatch({ type: 'HIDE_LOADER' })
  })
}
