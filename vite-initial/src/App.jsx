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

  const calcOperation = (prevOperation, state) => {
    const a = state.stackValue
    const b = state.inputValue
    setInputState({
      inputValue: 0,
      stackValue: state.operation ? state.operation(a, b) : b,
      operation: prevOperation,
    })
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
          calcOperation(add, inputState)
        }}
      >
        +
      </button>
      {/* Вычитание */}
      <button
        onClick={() => {
          calcOperation(sub, inputState)
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
