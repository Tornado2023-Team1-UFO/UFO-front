'use client'

import { NavigationMenu } from './_components/NavigationMenu'
import { useSpringCarousel } from 'react-spring-carousel'
import { useEffect, useState } from 'react'
import { EventsRepository } from '@/repositories/EventsRepository'
import { EventSlideItem } from './_models/EventSlideItem'
import { EventItems } from './_components/EventItems'
const EventPage = () => {
  const [events, setEvents] = useState<EventSlideItem[]>([])

  const fetchEvents = async () => {
    const results = await EventsRepository.getEventSlideItems()
    setEvents(results)
  }

  const deleteEvent = (eventId: string) => {
    const newEvents = events.filter((event) => event.id !== eventId)
    setEvents(newEvents)
  }

  useEffect(() => {
    fetchEvents()
  }, [])
  return <EventItems events={events} deleteEvent={deleteEvent} />
}

export default EventPage
