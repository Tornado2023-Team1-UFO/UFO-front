'use client'

import styles from './index.module.css'
import { StartButton } from '@/components/button/StartButton'
import { useRouter } from 'next/navigation'
import { Path } from '@/constants/path'

export default function Page() {
  const router = useRouter()
  const clickEventCreateStart = () => {
    router.push(Path.EVENT_CREATE)
  }

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <h1 className={styles.title}>イベント作成TOP</h1>
        <div>
          <h3 className={styles.subtitle}>質問に答えていくと、ChatGPTが</h3>
          <h3 className={styles.subtitle}>イベント説明文を書いてくれるよ！</h3>
        </div>
      </div>
      <StartButton onClick={clickEventCreateStart} />
    </div>
  )
}
