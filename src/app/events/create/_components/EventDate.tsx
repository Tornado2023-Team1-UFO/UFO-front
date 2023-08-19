import { FC } from 'react'
import styles from './EventDate.module.css'

type Props = {
  startAt: string
  endAt: string
  onChangeStartAt: (eventDate: string) => void
  onChangeEndAt: (eventDate: string) => void
}

export const EventDate: FC<Props> = ({ startAt, endAt, onChangeStartAt, onChangeEndAt }) => (
  <div className={styles.container}>
    <input
      className={styles.input_date}
      type='date'
      value={startAt}
      onChange={(e) => onChangeStartAt(e.target.value)}
    />
    <p className={styles.text}>から</p>
    <input className={styles.input_date} type='date' value={endAt} onChange={(e) => onChangeEndAt(e.target.value)} />
    <p className={styles.text}>まで</p>
  </div>
)
