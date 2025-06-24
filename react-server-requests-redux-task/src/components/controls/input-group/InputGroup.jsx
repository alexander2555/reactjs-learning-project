import styles from '../Controls.module.css'

export const InputGroup = ({ children, ownClass }) => {
  return <div className={styles['input-group'] + ' ' + ownClass}>{children}</div>
}
