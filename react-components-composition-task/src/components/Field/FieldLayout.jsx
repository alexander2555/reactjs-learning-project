import styles from './Field.module.css'

export const FieldLayout = gameState => {
  return (
    <ul className={styles.field}>
      {gameState.field.map((row, i) =>
        <li key={i}>{row.map((cell, j) =>
          <span key={j}>{cell}</span>)}</li>)}
    </ul>
  )
}