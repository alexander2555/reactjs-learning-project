import { useState } from 'react'
import { useGetItems, useAddItem, useUpdateItem, useDeleteItem } from './hooks'

import styles from './App.module.css'

export const App = () => {
  const [refresh, setRefresh] = useState(false)

  const { products, isLoading } = useGetItems(refresh)
  const { addItem, isCreating } = useAddItem(refresh, setRefresh)
  const { updateItem, isUpdating } = useUpdateItem(refresh, setRefresh)
  const { deleteItem, isDeleting } = useDeleteItem(refresh, setRefresh)

  const showLoader = isCreating || isLoading || isUpdating || isDeleting

  return (
    <div className={styles.app}>
      {showLoader && <div className={styles.loader}></div>}
      {products.map(({ id, name, price }) => (
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
