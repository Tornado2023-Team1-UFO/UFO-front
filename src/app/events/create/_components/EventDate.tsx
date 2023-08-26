import { FC } from 'react'
import styles from './eventDate.module.css'

type Props = {
  startAt: string
  endAt: string
  onChangeStartAt: (eventDate: string) => void
  onChangeEndAt: (eventDate: string) => void
}

export const EventDate: FC<Props> = ({ startAt, endAt, onChangeStartAt, onChangeEndAt }) => (
  <div className={styles.container}>
    <div className={styles.input_container}>
      <img src='/images/start.svg' alt='start' />
      <div className={styles.date_container}>
        <input
          className={styles.input_date}
          type='date'
          value={startAt}
          onChange={(e) => onChangeStartAt(e.target.value)}
        />
      </div>
    </div>
    <div>
      <img src='/images/nextDate.svg' alt='next' />
    </div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
      }}
      className={styles.input_container}
    >
      <div className={styles.date_container}>
        <input
          className={styles.input_date}
          type='date'
          value={endAt}
          onChange={(e) => onChangeEndAt(e.target.value)}
        />
      </div>
      <img src='/images/goal.svg' alt='goal' />
    </div>
  </div>
)
