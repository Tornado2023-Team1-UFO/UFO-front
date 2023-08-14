'use client'
import CategoryHeadLine from './CategoryHeadLine'
import styles from './EventContainer.module.css'
import EventCard from './EventCard'
import { useState, useEffect } from 'react'
import { EventsRepository } from '@/repositories/EventsRepository'
import { EventSlideItem } from '@/app/event/_components/_models/EventSlideItem'
import { queryEvents } from './queryEvents'

export default function EventContainer(props: any) {
  const { category } = props
  const [events, setEvents] = useState<EventSlideItem[]>([])
  const fetchEvents = async () => {
    const results = await queryEvents(category)
    console.log(results)
    setEvents(results)
  }
  useEffect(() => {
    fetchEvents()
  }, [])
  //   let eventCategories = ['人気上昇中のイベント', '夏の成長体験', '仲間と弾ける', 'インドアオタク集合']
  return (
    <>
      <div className='eventcontainer'>
        <CategoryHeadLine title={category} />
        <div className={styles.cardcontainer}>
          {/* only show if there's data  */}
          {events &&
            events.map((event, index: number) => (index <= 3 ? <EventCard key={event.id} {...event} /> : null))}
          {events && events.length === 0 && <p>There are no events available</p>}
        </div>
      </div>
    </>
  )
}
