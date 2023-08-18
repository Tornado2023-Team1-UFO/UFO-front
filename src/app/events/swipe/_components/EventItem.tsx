'use client'

import { FC } from 'react'
import styles from './eventItem.module.css'
import dayjs from 'dayjs'
import { EventModal } from './EventModal'
import Image from 'next/image'

type Props = {
  title: string
  prefecture: string
  attendeeCounts: number
  recruitPeopleCounts: number
  startAt: Date
  endAt: Date
  backgroundImages: string[]
  currentIndex: number
  onTapEvent: (backgroundImages: string[]) => void
}

export const EvetntItem: FC<Props> = ({
  title,
  prefecture,
  attendeeCounts,
  recruitPeopleCounts,
  startAt,
  endAt,
  backgroundImages,
  currentIndex,
  onTapEvent,
}) => {
  const startDate = dayjs(startAt).format('YYYY/MM/DD(ddd)')
  const endDate = dayjs(endAt).format('MM/DD(ddd)')
  return (
    <div
      className={styles.full}
      style={{
        backgroundImage: `url("${backgroundImages[currentIndex]}")`,
      }}
      onClick={() => onTapEvent(backgroundImages)}
    >
      {title ? (
        <div className={styles.items}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.box}>
            <img src='images/pin.svg' alt='pin' />
            <p>{prefecture}</p>
          </div>
          <p className={styles.text}>{`${startDate}〜${endDate}`}</p>
          <p className={styles.text}>{`現在参加者 ${attendeeCounts}/${recruitPeopleCounts}人`}</p>
          <div className={styles.circles}>
            {backgroundImages.map((backgroundImage, index) => (
              <span
                key={index}
                className={styles.circle}
                style={{
                  backgroundColor: currentIndex === index ? '#FFC107' : '#fff',
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <EventModal />
      )}
    </div>
  )
}
