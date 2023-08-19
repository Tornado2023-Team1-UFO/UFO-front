import { FC } from 'react'
import styles from './EventDescription.module.css'

type Props = {
  description: string
  onChangeDescription: (description: string) => void
}

export const EventDescription: FC<Props> = ({ onChangeDescription, description }) => {
  return (
    <div className={styles.container}>
      <textarea className={styles.textarea} onChange={(e) => onChangeDescription(e.target.value)} value={description} />
    </div>
  )
}
