'use client'

import { useRouter } from 'next/navigation'
import styles from './styleTop.module.css'
import { StartButton } from '@/components/button/StartButton'
import { Path } from '@/constants/path'

export default function Page() {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <div className={styles.title_subtitle}>
        <p className={styles.subtitle}>あなたはこの夏、どんな青春がしたい？</p>
        <h1 className={styles.title}>青春スタイル診断</h1>
      </div>
      <StartButton onClick={() => router.push(Path.EVENT_STYLE_DIAGNOSIS)} />
    </div>
  )
}
