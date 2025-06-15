import styles from './Button.module.css'

export const Button = ({ children, title, onClick, disabled, ownClass }) => {
  return (
    <button
      className={styles['todo-item-btn'] + ' ' + styles[ownClass]}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  )
}
