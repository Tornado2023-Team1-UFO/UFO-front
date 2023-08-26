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
          <h1>支援が完了しました🎉</h1>
        </div>
      </div>

      <div className={styles.description}>
        <h3 className={styles.subtitle}>ありがとうございました</h3>
        <div className={styles.button_container}>
          <h3 className={styles.subtitle}>興味のあるイベントを探そう</h3>
          <img src='/images/barRight.svg' className={styles.bar_right} alt='わあ' />
          <img src='/images/barLeft.svg' className={styles.bar_left} alt='わあ' />
        </div>
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
