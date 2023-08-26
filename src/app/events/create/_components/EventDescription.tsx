import { FC } from 'react'
import styles from './eventDescription.module.css'

type Props = {
  description: string
  onChangeDescription: (description: string) => void
}

export const EventDescription: FC<Props> = ({ onChangeDescription, description }) => {
  return (
    <div className={styles.container}>
      <div className={styles.textarea_container}>
        <img className={styles.note_pin_left} src='/images/notePin.svg' alt='留め具' />
        <img className={styles.note_pin_right} src='/images/notePin.svg' alt='留め具' />
        <textarea
          className={styles.textarea}
          onChange={(e) => onChangeDescription(e.target.value)}
          value={description}
        />
      </div>
    </div>
  )
}
