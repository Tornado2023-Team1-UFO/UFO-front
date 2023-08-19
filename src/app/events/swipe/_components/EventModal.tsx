import Link from 'next/link'
import styles from './eventModal.module.css'
import { Path } from '@/constants/path'

export const EventModal = () => (
  <div className={styles.modal}>
    <div className={styles.title}>
      <h2>イベントがありません</h2>
      <h2>イベントを作ろう</h2>
    </div>
    <Link href={Path.EVENT_CREATE_TOP} className={styles.button}>
      <p>イベントを作る</p>
    </Link>
  </div>
)
