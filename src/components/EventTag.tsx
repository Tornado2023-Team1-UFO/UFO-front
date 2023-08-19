import { FC } from 'react'
import styles from './eventTag.module.css'
type Props = {
  title: string
}

export const EventTag: FC<Props> = ({ title }) => (
  <div className={styles.event_tag}>
    <span className={styles.hash_tag}>
      <img src='images/hash.svg' alt='hash' />
    </span>
    <h1 className={styles.title}>{title}</h1>
  </div>
)
