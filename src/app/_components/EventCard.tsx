'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './eventcard.module.css'
import dayjs from 'dayjs'
import { Path } from '@/constants/path'
import ja from 'dayjs/locale/ja'
dayjs.locale(ja)
// This component is responsible for EventCard that will be displayed in the home page
// takes in event information as props
export default function EventCard(event: any) {
  const router = useRouter()
  const handleClick = () => {
    // redirect to the event details page
    console.log('Clicked')
    router.push(`${Path.EVENT_DETAIL}/${event.id}`)
  }
  const startDate = dayjs(event.startAt).format('YYYY/MM/DD(ddd)')
  const endDate = dayjs(event.endAt).format('MM/DD(ddd)')
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardimage}>
          <figure>
            <Image
              className={styles.image}
              src={event.imageUrls[0]}
              alt='Placeholder image'
              fill
              style={{
                objectPosition: 'center',
              }}
              onClick={handleClick}
            />
          </figure>
          <div className={styles.location}>
            <img src='/images/location.svg' alt='location' className={styles.locationIcon} />
            <p className={styles.prefecture}>{event.prefecture}</p>
          </div>
        </div>
        <div className={styles.firstContent}>
          <h1 className={styles.cardTitle}>{event.title}</h1>
        </div>
        <div className={styles.secondContent}>
          <div>
            <p className={styles.cardDate}>
              {startDate} ~ {endDate}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
