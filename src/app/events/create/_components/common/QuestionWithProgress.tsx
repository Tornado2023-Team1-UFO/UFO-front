import { FC } from 'react'
import { CustomProgressBar } from './CustomProgressbar'
import { Title } from './Title'
import styles from './questionWithProgress.module.css'
type Props = {
  progress: number
  question: string
}

export const QuestionWithProgress: FC<Props> = ({ progress, question }) => (
  <div className={styles.container}>
    <CustomProgressBar progress={progress} />
    <Title title={question} />
  </div>
)
