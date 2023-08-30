import ProgressBar from '@ramonak/react-progress-bar'
import { FC } from 'react'
import styles from './customProgressbar.module.css'

type Props = {
  progress: number
}

export const CustomProgressBar: FC<Props> = ({ progress }) => (
  <ProgressBar
    height='12px'
    className={styles.progress_bar}
    bgColor={'var(--light-primary-color)'}
    completed={progress}
    customLabel=' '
  />
)
