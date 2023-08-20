'use client'

import Link from 'next/link'
import styles from './index.module.css'
import { Path } from '@/constants/path'
import { toast } from 'react-hot-toast'

const handleClick = async () => {
  toast.success('お気に入りのイベントを見るためにはログインが必要です')
  await setTimeout(() => {}, 1000)
}

export const NavigationHeader = () => (
  <div className={styles.navigations}>
    <Link href={Path.EVENT_CREATE_TOP} className={styles.navigation}>
      <p>イベントをつくる</p>
    </Link>
    <Link onClick={handleClick} href={Path.USER_FAVORITE_EVENT_LIST} className={styles.navigation}>
      <p>お気に入りのイベント</p>
    </Link>
  </div>
)
