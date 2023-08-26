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
import { EventSlideItem } from './_models/EventSlideItem'
import { PanInfo, motion, useMotionValue, useTransform } from 'framer-motion'

type Props = {
  event: EventSlideItem
  currentIndex: number
  onTapEvent: (backgroundImages: string[]) => void
  isActive: boolean
  leaveX: number
  onDragEnd: (_e: any, info: PanInfo) => void
  onDragStart: (_e: any, info: PanInfo) => void
}

export const EventItem: FC<Props> = ({ event, currentIndex, onTapEvent, isActive, leaveX, onDragEnd, onDragStart }) => {
  dayjs.locale('ja')
  const startDate = dayjs(event.startAt).format('YYYY/MM/DD(ddd)')
  const endDate = dayjs(event.endAt).format('MM/DD(ddd)')
  const router = useRouter()
  const x = useMotionValue(0)
  const background = useTransform(
    x,
    [-100, 0, 100],
    ['rgba(19,81,154. 0.5)', 'rgba(0,0,0,0)', 'rgba(246, 140, 185, 0.8)'],
  )
  const opacity = useTransform(x, [-100, 0, 100], [0.5, 1, 0.5])
  const likeOpacity = useTransform(x, [-100, 0, 100], [0, 0, 1])
  const badOpacity = useTransform(x, [-100, 0, 100], [1, 0, 0])

  if (!event.title) {
    return <EventModal />
  }

  return (
    <>
      {isActive && (
        <motion.div
          style={{ x }}
          drag
          dragConstraints={{ left: 0, right: 0 }}
          dragSnapToOrigin
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          initial={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: leaveX, opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className={styles.container}
        >
          <motion.div style={{ background }} className={styles.overlay}>
            <motion.span
              style={{
                opacity: likeOpacity,
              }}
              className={styles.status}
            >
              <div className={styles.status_circle}>
                <img width={72} height={48} src='/images/heart.jpeg' alt='bad' />
              </div>
              <h1 className={styles.status_text}>いいね！</h1>
            </motion.span>
            <motion.span
              style={{
                opacity: badOpacity,
              }}
              className={styles.status}
            >
              <div className={styles.status_circle}>
                <img width={72} height={48} src='/images/guruguru.jpeg' alt='bad' />
              </div>
              <h1 className={styles.status_text}>イマイチ...</h1>
            </motion.span>
          </motion.div>
          <motion.div
            className={styles.image}
            style={{
              backgroundImage: `url("${event.imageUrls[currentIndex]}")`,
              opacity,
            }}
            onClick={() => onTapEvent(event.imageUrls)}
          >
            <div className={styles.circles}>
              {event.imageUrls.map((backgroundImage, index) => (
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
              <h1 className={styles.title}>{event.title}</h1>
              <p className={styles.date}>
                {startDate} 〜 {endDate}
              </p>
              <div className={styles.link} onClick={() => router.push(`/events/${event.id}`)}>
                <AiOutlineExclamationCircle />
                <p>詳細ページへ</p>
              </div>
            </div>
          </motion.div>
          <div className={styles.infomations}>
            <div className={styles.info}>
              <BsFillPeopleFill size={40} />
              <p>{`${event.attendeeCounts}/${event.recruitPeopleCounts}人`}</p>
            </div>
            <div className={styles.info}>
              <FiMapPin size={40} />
              <p>{event.prefecture}</p>
            </div>
            <div className={styles.info} style={{ border: 'none' }}>
              <BiYen size={40} />
              <p>{`${event.eventFee}円`}</p>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}
