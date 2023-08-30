'use client'

import { useRouter } from 'next/navigation'
import styles from './styleTop.module.css'
import { StartButton } from '@/components/button/StartButton'
import { Path } from '@/constants/path'

export default function Page() {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <img src='/images/styleTitle.svg' alt='style title' />
      <img src='/images/styleImage.svg' alt='style ilast' />
      <div className={styles.button_container}>
        <StartButton onClick={() => router.push(Path.EVENT_STYLE_DIAGNOSIS)} />
      </div>
    </div>
  )
}
