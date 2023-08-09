'use client'

import { FC } from 'react'
import styles from './eventItem.module.css'
import { FaHeart, FaLink, FaUser } from 'react-icons/fa'

type Props = {
  backgrountImageUrl: string
  attendCounts: number
  likeCounts: number
}

export const EvetntItem: FC<Props> = ({ backgrountImageUrl, attendCounts, likeCounts }) => (
  <div
    className={styles.full}
    style={{
      backgroundImage: `url("${backgrountImageUrl}")`,
    }}
  >
    <div className={styles.items}>
      <div>
        <FaUser className={styles.icon} />
        <p className={styles.text}>{attendCounts}</p>
      </div>
      <div>
        <FaHeart className={styles.icon} />
        <p className={styles.text}>{likeCounts}</p>
      </div>
      <div>
        <FaLink className={styles.icon} />
        <p className={styles.text}>共有</p>
      </div>
    </div>
  </div>
)
