export const initialViewState = {
  sort: false,
  search: '',
  showLoader: true,
}

export const viewReducer = (state = initialViewState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'FILTER_TODOS': {
      console.log(payload)
      return {
        ...state,
        search: payload,
      }
    }
    case 'SORT_TODOS': {
      return {
        ...state,
        sort: payload,
      }
    }
    case 'SHOW_LOADER': {
      return {
        ...state,
        showLoader: true,
      }
    }
    case 'HIDE_LOADER': {
      return {
        ...state,
        showLoader: false,
      }
    }
    default:
      return state
  }
}
