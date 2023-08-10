'use client'
import styles from './navigationMenu.module.css'
import { TbSquarePlus } from 'react-icons/tb'

export const NavigationMenu = () => {
  return (
    <div className={styles.menus}>
      <div className={styles.circle}>
        <img src='images/heart.svg' alt='heart' />
      </div>
      <div className={styles.circle}>
        <img src='images/backArrow.svg' alt='backArrow' />
      </div>
    </div>
  )
}
