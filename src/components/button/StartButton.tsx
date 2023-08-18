import { FC } from 'react'
import styles from './StartButton.module.css'
type Props = {
  onClick: () => void
}

export const StartButton: FC<Props> = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={() => onClick()}>
      <p className={styles.button_text}>はじめる</p>
    </button>
  )
}
