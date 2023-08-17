import Link from 'next/link'
import styles from './index.module.css'

export const NavigationHeader = () => (
  <div className={styles.navigations}>
    <Link href='/admins/events/create' className={styles.navigation}>
      <p>イベントをつくる</p>
    </Link>
    <Link href='/events/support' className={styles.navigation}>
      <p>お気に入りのイベント</p>
    </Link>
  </div>
)
