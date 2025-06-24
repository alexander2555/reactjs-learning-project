export const initialTodosState = {
  todos: [],
}

export const todosReducer = (state = initialTodosState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'UPDATE_TODOS': {
      console.log('Загружены todo с сервера:', payload)
      return {
        todos: [...payload],
      }
    }
    case 'ADD_TODO': {
      const todos = [...state.todos]
      todos.push(payload)
      console.log('Добавлено todo:', payload)
      return {
        todos,
      }
    }
    case 'UPDATE_TODO': {
      console.log('Обновлено todo:', payload)
      return {
        todos: [...state.todos].map(todo => (todo.id == payload.id ? payload : todo)),
      }
    }
    case 'REMOVE_TODO': {
      console.log('Удалено todo:', payload)
      return {
        todos: [...state.todos].filter(todo => todo.id !== payload),
      }
    }
    case 'CLEAR_TODOS': {
      console.log('Удалены все todo')
      return {
        todos: [],
      }
    }
    case 'FILL_TODOS': {
      console.log(`Добавлено ${payload.length} mock todo`)
      return {
        todos: [...state.todos, ...payload],
      }
    }
    default:
      return state
  }
}
