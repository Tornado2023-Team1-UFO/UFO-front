'use client'

import { EventItems } from './_components/EventItems'
import { useSwipeEvent } from './_hooks/useSwipeEvent'
const EventPage = () => {
  const { events } = useSwipeEvent()

  if (events.length === 0) return null
  return <EventItems />
}

export default EventPage
