'use client'
import styles from './navigationMenu.module.css'
import { TbSquarePlus } from 'react-icons/tb'

export const NavigationMenu = () => {
  return (
    <div className={styles.menus}>
      <div>
        <TbSquarePlus className={styles.button} />
      </div>
    </div>
  )
}
