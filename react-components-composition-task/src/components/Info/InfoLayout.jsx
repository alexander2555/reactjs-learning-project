import styles from './Info.module.css'

export const InfoLayout = ({ currentPlayer }) => {
  return (
    <div className={styles.info}>
      Ход игрока:&nbsp;
      <strong style={{ color: currentPlayer === 'X' ? 'red' : 'blue' }}>
        {currentPlayer}
      </strong>
    </div>
  )
}
