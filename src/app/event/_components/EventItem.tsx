'use client'

import { FC } from 'react'
import styles from './eventItem.module.css'
import dayjs from 'dayjs'

export type EventItemProps = {
  backgrountImageUrl: string
  title: string
  prefecture: string
  attendeeCounts: number
  recruitPeopleCounts: number
  startAt: Date
  endAt: Date
  backgroundImages: string[]
}

export const EvetntItem: FC<EventItemProps> = ({
  backgrountImageUrl,
  title,
  prefecture,
  attendeeCounts,
  recruitPeopleCounts,
  startAt,
  endAt,
  backgroundImages,
}) => {
  const startDate = dayjs(startAt).format('YYYY/MM/DD(ddd)')
  const endDate = dayjs(endAt).format('MM/DD(ddd)')
  return (
    <div
      className={styles.full}
      style={{
        backgroundImage: `url("${backgrountImageUrl}")`,
      }}
    >
      <div className={styles.items}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.box}>
          <img src='images/pin.svg' alt='pin' />
          <p>{prefecture}</p>
        </div>
        <p className={styles.text}>{`${startDate}〜${endDate}`}</p>
        <p className={styles.text}>{`現在参加者 ${attendeeCounts}/${recruitPeopleCounts}人`}</p>
        <div className={styles.circles}>
          {backgroundImages.map((backgroundImage) => (
            <span className={styles.circle} />
          ))}
        </div>
      </div>
    </div>
  )
}
