export const initialControlsState = {
  addTodoInputVal: '',
  searchTodoInputVal: '',
  editTodoInputVal: '',
  editTodoIndex: null,
  sortTodoCheckboxChecked: false,
}

export const controlsReducer = (state = initialControlsState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'ADD_TODO_INPUT_CHANGE': {
      return {
        ...state,
        addTodoInputVal: payload,
      }
    }
    case 'SEARCH_TODO_INPUT_CHANGE': {
      return {
        ...state,
        searchTodoInputVal: payload,
      }
    }
    case 'SORT_TODO_CHECKBOX_TOGGLE': {
      return {
        ...state,
        sortTodoCheckboxChecked: !state.sortTodoCheckboxChecked,
      }
    }
    case 'EDIT_TODO_INPUT_CHANGE': {
      return {
        ...state,
        editTodoInputVal: payload,
      }
    }
    case 'EDIT_TODO_INDEX': {
      return {
        ...state,
        editTodoIndex: payload,
      }
    }
    default:
      return state
  }
}
