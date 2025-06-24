import { useSelector, useDispatch } from 'react-redux'

import { showLoaderSel } from '../../../selectors'
import { fillTodosToServer, clearTodosFromServer } from '../../../actions'

import { Button, InputGroup } from '../../'

export const PanelBottom = () => {
  const dispatch = useDispatch()

  const showLoader = useSelector(showLoaderSel)
  const todos = useSelector(state => state.todosState.todos)

  return (
    <>
      <InputGroup>
        <Button
          onClick={() => {
            if (confirm('Точно?!')) {
              /** CLEAR_TODOS */
              dispatch(clearTodosFromServer(todos))
            }
          }}
          disabled={showLoader || !todos.length}
          title='удалить'
        >
          Удалить все &times;
        </Button>
        &nbsp;
        <Button
          onClick={() => {
            if (confirm('Уверен?!')) {
              /** FILL_TODOS */
              dispatch(fillTodosToServer)
            }
          }}
          disabled={showLoader}
          title='загрузить из jsonplaceholder'
        >
          Загрузить mock
        </Button>
        <hr />
      </InputGroup>
    </>
  )
}
