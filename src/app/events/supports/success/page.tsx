import Link from 'next/link'
import styles from './index.module.css'
const Page = () => {
  return (
    <div className={styles.title}>
      <p>支援が完了しました</p>
      <div>Thanks you for your support 🎉</div>
      <Link href='/'>
        <button className={styles.button}>ホームに戻る</button>
      </Link>
    </div>
  )
}

export default Page
