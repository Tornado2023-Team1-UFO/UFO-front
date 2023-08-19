import { FC } from 'react'
import styles from './Calculator.module.css'
type Props = {
  value: number
  unit: '円' | '人'
  onClickNumber: (number: string) => void
  choices: number[]
  onClickDelete: () => void
  onClickChoice: (number: number) => void
}

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

export const Calculator: FC<Props> = ({ value, unit, onClickNumber, choices, onClickDelete, onClickChoice }) => (
  <div className={styles.box}>
    <div className={styles.display}>
      <p className={styles.display_text}>
        {value}
        {unit}
      </p>
    </div>

    <div className={styles.choice_box}>
      {choices.map((choice) => (
        <p key={choice} className={styles.choice_text} onClick={() => onClickChoice(choice)}>
          {choice}
          {unit}
        </p>
      ))}
    </div>

    <div className={styles.grid}>
      {numbers.map((number) => (
        <p key={number} className={styles.number} onClick={() => onClickNumber(number)}>
          {number}
        </p>
      ))}
    </div>

    <div className={styles.flex}>
      <p className={styles.number}></p>
      <p className={styles.number} onClick={() => onClickNumber('0')}>
        0
      </p>
      <img className={styles.delete} src='/images/del.svg' alt='delete' onClick={() => onClickDelete()} />
    </div>
  </div>
)
