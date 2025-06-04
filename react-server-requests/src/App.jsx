import { useGetItems, useAddItem, useUpdateItem, useDeleteItem } from './hooks'

import styles from './App.module.css'

export const App = () => {
  const { items, setItems, isLoading } = useGetItems()
  const { addItem, isCreating } = useAddItem(setItems)
  const { updateItem, isUpdating } = useUpdateItem(setItems)
  const { deleteItem, isDeleting } = useDeleteItem(setItems)

  const showLoader = isCreating || isLoading || isUpdating || isDeleting

  return (
    <div className={styles.app}>
      {showLoader && <div className={styles.loader}></div>}
      {Object.entries(items).map(([id, { name, price }]) => (
        <div key={id}>
          {name}: {price} р.
        </div>
      ))}
      <button onClick={addItem} disabled={showLoader}>
        Добавить элемент
      </button>
      <button onClick={updateItem} disabled={showLoader}>
        Обновить элемент
      </button>
      <button onClick={deleteItem} disabled={showLoader}>
        Удалить элемент
      </button>
    </div>
  )
}
