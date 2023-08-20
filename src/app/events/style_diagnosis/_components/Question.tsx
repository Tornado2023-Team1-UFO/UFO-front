import { FC } from 'react'
import styles from './question.module.css'
type Props = {
  title: string
  onClickAnswer: (point: 0 | 1) => void
  choice1: string
  choice2: string
  questionId: number
}

export const Question: FC<Props> = ({ title, onClickAnswer, choice1, choice2, questionId }) => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <div className={styles.title_box}>
        <h2 className={styles.question_id}>Q{questionId}.</h2>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles.choices}>
        <button className={styles.choice_box} onClick={() => onClickAnswer(1)}>
          <p className={styles.choice}>{choice1}</p>
        </button>
        <button className={styles.choice_box} onClick={() => onClickAnswer(0)}>
          <p className={styles.choice}>{choice2}</p>
        </button>
      </div>
    </div>
  </div>
)
