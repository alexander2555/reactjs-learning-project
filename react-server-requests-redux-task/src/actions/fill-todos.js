import { postItem } from '../api'

const LIMIT_MOCK_TODOS = 42

const fetchMockTodos = count =>
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(data => data.json())
    .then(async todos => {
      const todoItems = []
      for (const { id, title } of todos) {
        console.log('Добавляется todo', title, '...')
        todoItems.push(await postItem(title))
        if (id >= count) break
      }
      return todoItems
      //Promise.all(todoItems.map(({ title }) => pushTodo(title)))
    })

export const fillTodosToServer = dispatch => {
  dispatch({ type: 'SHOW_LOADER' })
  fetchMockTodos(LIMIT_MOCK_TODOS).then(todos => {
    dispatch({
      type: 'FILL_TODOS',
      payload: todos,
    })
    dispatch({ type: 'HIDE_LOADER' })
  })
}
