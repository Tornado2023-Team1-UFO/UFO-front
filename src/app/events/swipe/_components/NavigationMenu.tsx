'use client'
import { FC } from 'react'
import styles from './navigationMenu.module.css'

type Props = {
  onClickHeart: () => void
  onClickBack: () => void
}

export const NavigationMenu: FC<Props> = ({ onClickHeart, onClickBack }) => {
  return (
    <div className={styles.menus}>
      <div onClick={() => onClickBack()} className={styles.circle}>
        <img src='/images/backArrow.svg' alt='backArrow' />
      </div>
      <div onClick={() => onClickHeart()} className={styles.circle}>
        <img src='/images/heart.svg' alt='heart' />
      </div>
    </div>
  )
}
