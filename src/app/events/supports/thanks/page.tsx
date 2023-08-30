'use client'

import { Path } from '@/constants/path'
import styles from './index.module.css'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <div
        className={styles.title_image}
        style={{
          backgroundImage: 'url(/images/hukidashi2.svg)',
        }}
      >
        <div className={styles.content}>
          <h1>支援が完了しました 🎉</h1>
        </div>
      </div>
      <img src='/images/createSub3.svg' alt='event create ilast' />
      <div className={styles.description}>
        <button
          style={{
            marginTop: '38px',
          }}
          className={styles.button}
          onClick={() => router.push(Path.EVENT_LIST)}
        >
          ホームへ
        </button>
      </div>
    </div>
  )
}

export default Page
