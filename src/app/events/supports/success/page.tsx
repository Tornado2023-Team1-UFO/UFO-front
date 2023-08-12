import Link from 'next/link'
import styles from './index.module.css'
const Page = () => {
  return (
    <div className={styles.title}>
      <h1>Thanks</h1>
      <h1>You</h1>
      <Link href='/'>ホームに戻る</Link>
    </div>
  )
}

export default Page
