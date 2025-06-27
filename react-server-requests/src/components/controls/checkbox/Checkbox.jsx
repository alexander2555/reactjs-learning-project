import styles from './Checkbox.module.css'

export const Checkbox = ({ id, label, onClick, disabled }) => {
  return (
    <>
      <label htmlFor={id} className={styles['input-checkbox-label']}>
        {label}
      </label>
      <input
        id={id}
        type='checkbox'
        className={styles['input-checkbox']}
        onClick={onClick}
        disabled={disabled}
      />
    </>
  )
}
