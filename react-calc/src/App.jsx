import styles from './App.module.css'
import { useState } from 'react'

export const App = () => {
  /* Операции калькулятора */
  const add = (a, b) => a + b
  const sub = (a, b) => a - b
  const result = () =>
    inputState.operation
      ? inputState.operation(inputState.stackValue, inputState.inputValue)
      : inputState.inputValue
  /* Состояния */
  const initialState = {
    inputValue: 0,
    stackValue: 0,
    operation: add,
  }
  const [inputState, setInputState] = useState({ ...initialState })
  /* Обработчики нажатий кнопок */
  const digitInput = digit => {
    setInputState({
      ...inputState,
      inputValue: inputState.inputValue ? inputState.inputValue * 10 + digit : digit,
    })
  }
  const calcOperation = operation => {
    setInputState({
      inputValue: 0,
      stackValue: result(),
      operation,
    })
  }
  const totalOperation = () => {
    setInputState({
      inputValue: result(),
      stackValue: result(),
      operation: null,
    })
  }
  const resetOperation = () => {
    setInputState({ ...initialState })
  }
  // Кнопки 1-9
  const btnValues = []
  for (let i = 1; i < 10; i++) {
    btnValues.push({
      value: i,
      handler: digitInput,
    })
  }
  // Кнопка 0
  btnValues.push({
    value: 0,
    handler: digitInput,
  })
  /* Кнопки для операций */
  // Сложение
  btnValues.push({
    value: add,
    text: '+',
    handler: calcOperation,
  })
  // Вычитание
  btnValues.push({
    value: sub,
    text: '-',
    handler: calcOperation,
  })
  // Сброс
  btnValues.push({
    text: 'C',
    handler: resetOperation,
  })
  // Результат
  btnValues.push({
    text: '=',
    handler: totalOperation,
  })

  /** Вывод **/
  return (
    <div className={styles.app}>
      <input
        type='text'
        value={String(inputState.inputValue)}
        className={styles.input}
        style={{ color: !inputState.operation ? 'green' : 'black' }}
        readOnly
      />
      {/* Кнопки */}
      <div className={styles.row}>
        {btnValues.map(btnValue => (
          <button
            key={btnValue.value}
            value={typeof btnValue.value === 'number' ? btnValue.value : undefined}
            className={styles.btn}
            onClick={() => {
              btnValue.handler(btnValue.value, { ...inputState })
            }}
          >
            {typeof btnValue.value === 'number' ? btnValue.value : btnValue.text}
          </button>
        ))}
      </div>
    </div>
  )
}
