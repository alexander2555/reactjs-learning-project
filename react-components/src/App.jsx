import { useState } from 'react'
import styles from './App.module.css'

export const App = () => {
  const [value, setValue] = useState('')
  const [list, setList] = useState([])
  const [error, setError] = useState('')
  const [isValueVaild, setIsValueVaild] = useState(false)
  /* Обработчики нажатий */
  const onInputButtonClick = () => {
    const promptValue = prompt('Введите значение')
    if (promptValue && promptValue.length >= 3) {
      setValue(promptValue)
      setError('')
      setIsValueVaild(true)
    } else {
      setValue('')
      setError('Введенное значение должно содержать минимум 3 символа')
      setIsValueVaild(false)
    }
  }
  const onAddButtonClick = () => {
    // const updatedList = [...list, { id: Date.now(), value }]
    setList((list) => [...list, { id: Date.now(), value }])
    setValue('')
    setError('')
    setIsValueVaild(false)
  }

  return (
    <div className={styles.app}>
      <h1 className={styles['page-heading']}>Ввод значения</h1>
      <p className={styles['no-margin-text']}>
        Текущее значение <code>value</code>: "
        <output className={styles['current-value']}>{value}</output>"
      </p>

      {error !== '' && <div className={styles.error}>{error}</div>}

      <div className={styles['buttons-container']}>
        <button className={styles.button} onClick={onInputButtonClick}>
          Ввести новое
        </button>
        <button
          className={styles.button}
          onClick={onAddButtonClick}
          disabled={!isValueVaild}
        >
          Добавить в список
        </button>
      </div>
      <div className={styles['list-container']}>
        <h2 className={styles['list-heading']}>Список:</h2>
        {list.length ? (
          <ul className={styles.list}>
            {list.map((item) => (
              <li className={styles['list-item']} key={item.id}>
                {`${item.value} (${new Date(item.id).toLocaleString()})`}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles['no-margin-text']}>Нет добавленных элементов</p>
        )}
      </div>
    </div>
  )
}
