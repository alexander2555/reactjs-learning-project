import styles from './App.module.css'
import { useState } from 'react'

export const App = () => {
  const add = (a, b) => a + b
  const sub = (a, b) => a - b
  const initialState = {
    inputValue: 0,
    stackValue: 0,
    operation: add,
  }

  const [inputState, setInputState] = useState({ ...initialState })

  const btnValues = []
  for (let i = 0; i < 10; i++) {
    btnValues.push(i)
  }

  return (
    <div className={styles.app}>
      <input type='text' value={String(inputState.inputValue)} readOnly />
      {/* Кнопки для цифр 0-9 */}
      {btnValues.map(btnValue => (
        <button
          key={btnValue}
          value={btnValue}
          onClick={() => {
            console.log('inputState', inputState)
            setInputState({
              ...inputState,
              inputValue: inputState.inputValue
                ? inputState.inputValue * 10 + btnValue
                : btnValue,
            })
          }}
        >
          {btnValue}
        </button>
      ))}
      {/* Кнопки для операций */}
      {/* Сброс */}
      <button
        onClick={() => {
          setInputState({ ...initialState })
        }}
      >
        C
      </button>
      {/* Сложение */}
      <button
        onClick={() => {
          const a = inputState.stackValue
          const b = inputState.inputValue
          setInputState({
            inputValue: 0,
            stackValue: inputState.operation ? inputState.operation(a, b) : b,
            operation: add,
          })
        }}
      >
        +
      </button>
      {/* Вычитание */}
      <button
        onClick={() => {
          const a = inputState.stackValue
          const b = inputState.inputValue
          setInputState({
            inputValue: 0,
            stackValue: inputState.operation ? inputState.operation(a, b) : b,
            operation: sub,
          })
        }}
      >
        -
      </button>
      {/* Результат */}
      <button
        disabled={!inputState.operation}
        onClick={() => {
          const result = inputState.operation
            ? inputState.operation(inputState.stackValue, inputState.inputValue)
            : inputState.inputValue
          setInputState({
            // ...inputState,
            inputValue: result,
            stackValue: result,
            operation: null,
          })
        }}
      >
        =
      </button>
    </div>
  )
}
