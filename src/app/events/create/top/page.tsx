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
      <img src='/images/createTitle.svg' alt='event create title' />
      <img src='/images/createImage.svg' alt='event create ilast' />
      <div className={styles.description}>
        <div>
          <h3 className={styles.subtitle}>質問に答えていくと、ChatGPTが</h3>
          <h3 className={styles.subtitle}>イベント説明文を書いてくれるよ！</h3>
          <img src='/images/barRight.svg' className={styles.bar_right} alt='わあ' />
          <img src='/images/barLeft.svg' className={styles.bar_left} alt='わあ' />
        </div>
        <div className={styles.button_container}>
          <StartButton onClick={clickEventCreateStart} />
        </div>
      </div>
    </div>
  )
}
