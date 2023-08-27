import { FC } from 'react'
import styles from './eventTag.module.css'
type Props = {
  title: string
}

export const EventTag: FC<Props> = ({ title }) => {
  if (!title) return null

  return (
    <div className={styles.event_tag}>
      {title !== '人気上昇中のイベント' && (
        <span className={styles.hash_tag}>
          <img src='/images/hash.svg' alt='hash' />
        </span>
      )}
      <h1 className={styles.title}>{title}</h1>
    </div>
  )
}
