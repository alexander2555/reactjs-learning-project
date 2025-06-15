import styles from './InputGroup.module.css'

export const InputGroup = ({ children }) => {
  return <div className={styles['input-group']}>{children}</div>
}
