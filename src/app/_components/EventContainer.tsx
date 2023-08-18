'use client'
import CategoryHeadLine from './CategoryHeadLine'
import styles from './eventContainer.module.css'
import EventCard from './EventCard'
import { useState, useEffect } from 'react'
import { EventsRepository } from '@/repositories/EventsRepository'
import { EventSlideItem } from '@/app/events/swipe/_components/_models/EventSlideItem'
import { queryEvents } from './queryEvents'

export default function EventContainer(props: any) {
  const { category, prefecture } = props
  const [events, setEvents] = useState<EventSlideItem[]>([])
  const fetchEvents = async () => {
    const results = await queryEvents(category, prefecture)
    console.log(results)
    setEvents(results)
  }
  useEffect(() => {
    fetchEvents()
  }, [prefecture])
  //   let eventCategories = ['人気上昇中のイベント', '夏の成長体験', '仲間と弾ける', 'インドアオタク集合']
  return (
    <>
      <div className='eventcontainer'>
        <CategoryHeadLine title={category} />
        <div className={styles.cardcontainer}>
          {/* only show if there's data  */}
          {events && events.map((event, index: number) => <EventCard key={event.id} {...event} />)}
          {events && events.length === 0 && (
            <div className={styles.center}>
              <p>イベントがありません</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
