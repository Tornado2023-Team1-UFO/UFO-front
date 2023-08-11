'use client'
import styles from './navigationMenu.module.css'

export const NavigationMenu = () => {
  return (
    <div className={styles.menus}>
      <div className={styles.circle}>
        <img src='images/backArrow.svg' alt='backArrow' />
      </div>
      <div className={styles.circle}>
        <img src='images/heart.svg' alt='heart' />
      </div>
    </div>
  )
}
