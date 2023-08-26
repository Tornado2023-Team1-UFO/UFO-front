'use client'
import { FC } from 'react'
import styles from './navigationMenu.module.css'
import { motion } from 'framer-motion'
type Props = {
  onClickHeart: () => void
  onClickBack: () => void
}

export const NavigationMenu: FC<Props> = ({ onClickHeart, onClickBack }) => {
  return (
    <div className={styles.menus}>
      <motion.div
        whileTap={{
          backgroundColor: '#13519A',
          scale: 1.2,
          transition: { duration: 1 },
        }}
        onClick={() => onClickBack()}
        className={styles.circle}
      >
        <img src='/images/backArrow.svg' alt='backArrow' />
      </motion.div>
      <motion.div
        whileTap={{
          backgroundColor: '#F68CB9',
          scale: 1.2,
          transition: { duration: 1 },
        }}
        onClick={() => onClickHeart()}
        className={styles.circle}
      >
        <img src='/images/heart.svg' alt='heart' />
      </motion.div>
    </div>
  )
}
