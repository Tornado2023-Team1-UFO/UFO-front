'use client'

import { NavigationMenu } from './_components/NavigationMenu'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import { useEffect, useState } from 'react'
import { EventsRepository } from '@/repositories/EventsRepository'
import { EventSlideItem } from './_models/EventSlideItem'
import { EvetntItem } from './_components/EventItem'

const EventPage = () => {
  const [events, setEvents] = useState<EventSlideItem[]>([])

  const fetchEvents = async () => {
    const results = await EventsRepository.getEventSlideItems()
    setEvents(results)
  }

  useEffect(() => {
    fetchEvents()
  }, [])
  return (
    <Swiper>
      {events.map((event) => (
        <SwiperSlide key={event.id}>
          <EvetntItem
            backgrountImageUrl={event.mainImageUrl}
            attendCounts={event.attendCounts}
            likeCounts={event.likeCounts}
          />
        </SwiperSlide>
      ))}
      <NavigationMenu />
    </Swiper>
  )
}

export default EventPage
