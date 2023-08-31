'use client'
import CategoryHeadLine from './CategoryHeadLine'
import styles from './eventContainer.module.css'
import EventCard from './EventCard'
import { useState, useEffect } from 'react'
import { EventsRepository } from '@/repositories/EventsRepository'
import { EventSlideItem } from '@/app/events/swipe/_components/_models/EventSlideItem'
import { queryEvents } from './queryEvents'

export default function EventContainer(props: any) {
  const { category, prefecture, clickKeyword, keyword } = props
  const [events, setEvents] = useState<EventSlideItem[]>([])
  const fetchEvents = async () => {
    let results: EventSlideItem[] = []
    if (category === '人気上昇中のイベント') {
      if (prefecture === '全地域') {
        results = await EventsRepository.getEventByOrderFavorite()
      } else {
        console.log('prefecture', prefecture)
        results = await EventsRepository.getEventByOrderFavorite(prefecture)
      }
    } else {
      results = await queryEvents(category, prefecture)
    }

    if (keyword !== '') {
      results = results.filter((event) => event.title.includes(keyword))
    }
    setEvents(results)
  }
  useEffect(() => {
    fetchEvents()
  }, [prefecture, clickKeyword])
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
