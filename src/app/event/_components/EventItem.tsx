'use client'

import { FC } from 'react'
import styles from './eventItem.module.css'
import { FaHeart, FaLink, FaUser } from 'react-icons/fa'
import { NavigationMenu } from './NavigationMenu'

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
  ></div>
)
