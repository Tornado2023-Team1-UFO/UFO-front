import { FC } from 'react'
import styles from './prevButton.module.css'

type Props = {
  onClickButton: () => void
}

export const PrevButton: FC<Props> = ({ onClickButton }) => (
  <button className={styles.button} onClick={() => onClickButton()}>
    <img src='/images/prev.svg' alt='prev' />
  </button>
)
