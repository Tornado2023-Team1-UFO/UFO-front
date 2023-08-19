import { FC } from 'react'
import styles from './nextButton.module.css'

type Props = {
  onClickButton: () => void
}

export const NextButton: FC<Props> = ({ onClickButton }) => (
  <button className={styles.button} onClick={() => onClickButton()}>
    <img src='/images/next.svg' alt='next' />
  </button>
)
