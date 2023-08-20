import Link from 'next/link'
import styles from './index.module.css'
import { Path } from '@/constants/path'
const Page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>支援が完了しました</p>
        <div>Thanks you for your support 🎉</div>
        <Link href={Path.EVENT_LIST}>
          <button className={styles.button}>ホームに戻る</button>
        </Link>
      </div>
    </div>
  )
}

export default Page
