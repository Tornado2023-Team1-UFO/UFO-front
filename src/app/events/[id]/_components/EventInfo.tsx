import { FC, useState } from 'react'
import Image from 'next/image'
import Loading from '@/components/Loading'
import { EventInfoFooter } from './EventInfoFooter'
import styles from '@/app/events/[id]/_components/eventinfo.module.css'
import WebShareButton from '@/components/WebShareButton'
import { webShareData } from '@/components/webShareData'
import { FaLocationDot, FaPeopleGroup, FaYenSign } from 'react-icons/fa6'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { EventItem } from '../_model/event'
import { BsFillPeopleFill } from 'react-icons/bs'
import { FiMapPin } from 'react-icons/fi'
import { BiYen } from 'react-icons/bi'

type Props = {
  event?: EventItem
}

export const EventInfo: FC<Props> = ({ event }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const shareData: webShareData = {
    url: `https://tornade-ufo.vercel.app/events/${event?.id}`,
    text: 'イベントをシェアしよう！',
    title: 'SNSでシェアしよう',
  }
  if (!event) return <Loading />
  dayjs.locale('ja')
  const startDate = dayjs(event.startAt).format('YYYY/MM/DD(ddd)')
  const endDate = dayjs(event.endAt).format('YYYY/MM/DD(ddd)')

  const onClickImage = () => {
    if (currentIndex === event.imageUrls.length - 1) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <>
      <div className={styles.eventimagecontainer} onClick={() => onClickImage()}>
        {event.imageUrls.map((url: string, index: number) => {
          return (
            <div
              key={url}
              className={styles.maineventimage}
              style={{ display: index === currentIndex ? 'block' : 'none' }}
            >
              <Image
                className='eventimage'
                key={url}
                src={url}
                alt='event image'
                fill
                style={{
                  objectFit: 'cover',
                  // display: index === imageIndex ? 'block' : 'none',
                }}
              />
              <div className={styles.shareButton}>
                <WebShareButton {...{ ...shareData }} />
              </div>
            </div>
          )
        })}
      </div>
      <div className={styles.circles}>
        {event.imageUrls.map((backgroundImage, index) => (
          <span
            key={index}
            className={styles.circle}
            style={{
              backgroundColor: currentIndex === index ? 'var(--primary-color)' : '#d9d9d9d9',
            }}
          />
        ))}
      </div>
      <div className={styles.eventinfocontainer}>
        <div className={styles.event_content}>
          <div className={styles.eventtitle}>
            <h1>{event.title}</h1>
          </div>
          <div className={styles.eventhost}>
            <div className={styles.imagecontainer}>
              <Image
                src={event.organizer.iconUrl}
                alt='user photo'
                fill
                style={{
                  objectPosition: 'center',
                }}
              />
            </div>
            <div className={styles.eventhostname}>
              <p>{event.organizer.name}</p>
            </div>
          </div>
          <div className={styles.eventDate}>
            <p className={styles.eventDateTitle}>開催日時</p>
            <p className={styles.eventDateSE}>
              {startDate} ~ {endDate}
            </p>
          </div>
        </div>
        <div className={styles.eventExtraInfo}>
          <div className={styles.icon_container}>
            {/* <FaPeopleGroup className={styles.icon} /> */}
            <BsFillPeopleFill className={styles.icon} />
            <p>
              {event.attendeeCounts}/{event.recruitPeopleCounts}人
            </p>
          </div>
          {/* <div className={styles.border}></div> */}
          <div className={styles.icon_container}>
            {/* <FiMapPin className={styles.icon} /> */}
            <FaLocationDot className={styles.icon} />
            <p>{event.prefecture}</p>
          </div>
          {/* <div className={styles.border}></div> */}
          <div className={styles.icon_container}>
            <BiYen className={styles.icon} />
            {/* <FaYenSign className={styles.icon} /> */}
            <p>{event.eventFee}円</p>
          </div>
        </div>
        <div className={styles.eventContentContainer}>
          <img className={styles.note_pin_left} src='/images/notePin.svg' alt='留め具' />
          <img className={styles.note_pin_right} src='/images/notePin.svg' alt='留め具' />
          <p className={styles.eventContentTitle}>イベント概要</p>
          <p className={styles.eventContent}>{event.description}</p>
        </div>
        <div className={styles.categories}>
          {event.categories.map((category) => (
            <div className={styles.category} key={category}>
              <span>{category}</span>
            </div>
          ))}
        </div>
      </div>
      <EventInfoFooter
        eventId={event.id}
        isLiked={event.isLiked}
        isSupported={event.isSupported}
        isJoined={event.isJoined}
      />
    </>
  )
}
