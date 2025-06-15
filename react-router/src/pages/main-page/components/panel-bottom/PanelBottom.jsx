import { Button, InputGroup } from '../../../../components'

export const PanelBottom = ({ showLoader, addItem, deleteItem, setSearchInput }) => {
  return (
    <>
      <InputGroup>
        <Button
          onClick={() => {
            if (confirm('Точно?!')) {
              deleteItem()
              setSearchInput('')
            }
          }}
          disabled={showLoader}
          title='удалить'
        >
          Удалить все &times;
        </Button>
        &nbsp;
        <Button
          onClick={() => {
            if (confirm('Уверен?!')) addItem()
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
