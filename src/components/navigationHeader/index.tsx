'use client'

import Link from 'next/link'
import styles from './index.module.css'
import { Path } from '@/constants/path'
import { toast } from 'react-hot-toast'

export const NavigationHeader = () => (
  <div className={styles.navigations}>
    <Link href={Path.EVENT_CREATE_TOP} className={styles.navigation}>
      <p>イベントをつくる</p>
    </Link>
    <Link href={Path.USER_FAVORITE_EVENT_LIST} className={styles.navigation}>
      <p>お気に入りのイベント</p>
    </Link>
  </div>
)
