import styles from './TodoLink.module.css'

import { NavLink } from 'react-router-dom'

export const TodoLink = ({ id, title }) => {
  return (
    <li className={styles['todo-item']}>
      <NavLink to={'task/' + id} className={styles['todo-item-link']}>
        <span>{title}</span>
      </NavLink>
    </li>
  )
}
