'use client'

import { useRouter } from 'next/navigation'
import styles from './styleTop.module.css'
import { StartButton } from '@/components/button/StartButton'
import { Path } from '@/constants/path'

export default function Page() {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <img width={302} height={79} src='/images/styleTitle.png' alt='style title' />
      <img width={299} height={359} src='/images/styleImage.png' alt='style ilast' />
      <div className={styles.button_container}>
        <StartButton onClick={() => router.push(Path.EVENT_STYLE_DIAGNOSIS)} />
      </div>
    </div>
  )
}
