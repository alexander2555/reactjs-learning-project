import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { controlsReducer, todosReducer, viewReducer } from './reducers'

const reducer = combineReducers({
  todosState: todosReducer,
  controlsState: controlsReducer,
  viewState: viewReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
