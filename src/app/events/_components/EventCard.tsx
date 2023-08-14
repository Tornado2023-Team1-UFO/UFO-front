'use client'
import Link from 'next/link'
import Image from 'next/image'
import styles from './eventcard.module.css'
import { useRouter } from 'next/navigation'
// this component is responsible for EventCard that will be displayed
// in the event page
export default function EventCard(event: any) {
  const router = useRouter()
  const handleClick = () => {
    // redirect to the event details page
    router.push(`/events/${event.id}`)
  }
  // attendees will change
  console.log(event)
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardimage}>
          <figure>
            <Image
              src={event.imageUrls[0]}
              alt='Placeholder image'
              fill
              style={{
                objectPosition: 'center',
              }}
              onClick={handleClick}
            />
          </figure>
        </div>
        <div className={styles.firstContent}>
          <h1 className={styles.cardTitle}>{event.title}</h1>
        </div>
        <div className={styles.secondContent}>
          <p className={styles.cardDate}>{event.date}</p>
          <p className={styles.cardAttendees}>現在参加者: {event.attendeeCounts}</p>
          <span className={styles.cardAttendeesCount}>/</span>
          <p className={styles.cardAttendees}>{event.recruitPeopleCounts}人</p>
        </div>
      </div>
    </>
  )
}
