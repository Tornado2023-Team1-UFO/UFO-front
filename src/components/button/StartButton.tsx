import { FC } from 'react'
import styles from './startButton.module.css'
type Props = {
  onClick: () => void
}
import { motion } from 'framer-motion'

export const StartButton: FC<Props> = ({ onClick }) => {
  return (
    <motion.button whileTap={{ scale: 0.9 }} className={styles.button} onClick={() => onClick()}>
      <p className={styles.button_text}>はじめる</p>
    </motion.button>
  )
}
