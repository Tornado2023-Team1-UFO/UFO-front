'use client'

import { FC } from 'react'
import styles from './eventItem.module.css'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { BsFillPeopleFill } from 'react-icons/bs'
import { BiYen } from 'react-icons/bi'
import { FiMapPin } from 'react-icons/fi'

import { useRouter } from 'next/navigation'
import { EventModal } from './EventModal'
type Props = {
  id: string
  title: string
  prefecture: string
  attendeeCounts: number
  recruitPeopleCounts: number
  startAt: Date
  endAt: Date
  backgroundImages: string[]
  currentIndex: number
  eventFee: number
  onTapEvent: (backgroundImages: string[]) => void
}

export const EventItem: FC<Props> = ({
  id,
  title,
  prefecture,
  attendeeCounts,
  recruitPeopleCounts,
  startAt,
  endAt,
  backgroundImages,
  currentIndex,
  eventFee,
  onTapEvent,
}) => {
  dayjs.locale('ja')
  const startDate = dayjs(startAt).format('YYYY/MM/DD(ddd)')
  const endDate = dayjs(endAt).format('MM/DD(ddd)')
  const router = useRouter()

  if (!title) {
    return <EventModal />
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url("${backgroundImages[currentIndex]}")`,
        }}
        onClick={() => onTapEvent(backgroundImages)}
      >
        <div className={styles.circles}>
          {backgroundImages.map((backgroundImage, index) => (
            <span
              key={index}
              className={styles.circle}
              style={{
                backgroundColor: currentIndex === index ? 'var(--primary-color)' : 'var(--secondary-color)',
              }}
            />
          ))}
        </div>
        <div className={styles.title_container}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.date}>
            {startDate} 〜 {endDate}
          </p>
          <div className={styles.link} onClick={() => router.push(`/events/${id}`)}>
            <AiOutlineExclamationCircle />
            <p>詳細ページへ</p>
          </div>
        </div>
      </div>
      <div className={styles.infomations}>
        <div className={styles.info}>
          <BsFillPeopleFill size={40} />
          <p>{`${attendeeCounts}/${recruitPeopleCounts}人`}</p>
        </div>
        <div className={styles.info}>
          <FiMapPin size={40} />
          <p>{prefecture}</p>
        </div>
        <div className={styles.info} style={{ border: 'none' }}>
          <BiYen size={40} />
          <p>{`${eventFee}円`}</p>
        </div>
      </div>
    </div>
  )
}
