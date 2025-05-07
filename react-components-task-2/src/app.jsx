import { useState } from 'react'
import styles from './App.module.css'
import data from './data.json'

export const App = () => {
  // Состояние для хранения шагов и активного индекса
  const [steps, setSteps] = useState(data)
  const [activeIndex, setActiveIndex] = useState(0)
  // Индекс последнего шага
  const lastStepIndex = steps.length - 1
  // Обработчики клика назад, вперед и начать сначала
  const onBackward = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    }
  }
  const onForward = () => {
    if (activeIndex < lastStepIndex) {
      setActiveIndex(activeIndex + 1)
    }
  }
  const onStart = () => {
    setActiveIndex(0)
  }
  // Флаги для проверки первого и последнего шага
  const isFirstStep = activeIndex === 0
  const isLastStep = activeIndex === lastStepIndex

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Инструкция по готовке пельменей</h1>
        <div className={styles.steps}>
          <div className={styles['steps-content']}>{steps[activeIndex].content}</div>
          <ul className={styles['steps-list']}>
            {steps.map((step, i) => (
              <li
                key={step.id}
                className={`${styles['steps-item']}${i === activeIndex ? ' ' + styles.active : ''}${i < activeIndex ? ' ' + styles.done : ''}`}
              >
                <button className={styles['steps-item-button']}>{i + 1}</button>
                Шаг&nbsp;{i + 1}
              </li>
            ))}
          </ul>
          <div className={styles['buttons-container']}>
            <button className={styles.button}>Назад</button>
            <button className={styles.button}>
              Далее
              {/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
              {/* Или заменять всю кнопку в зависимости от условия */}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
