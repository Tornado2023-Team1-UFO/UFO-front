import { useEffect, useState } from 'react'
import { EventSlideItem } from '../_models/EventSlideItem'
import { EventsRepository } from '@/repositories/EventsRepository'

type ReturnType = {
  /*
   * 全てのイベント
   */
  events: EventSlideItem[]
  /*
   * いいね側にスワイプしたときの処理
   */
  swipeToLike: (id: string) => void

  /*
   * Bad側にスワイプしたときの処理
   */
  swipeToBad: (id: string) => void

  /*
   * Tapしたときの処理
   */
  tapEventItem: (index: number) => void
}

export const useSwipeEvent = (): ReturnType => {
  const [events, setEvents] = useState<EventSlideItem[]>([])
  const [currentEventId, setCurrentEventId] = useState('')
  const [backgroundImages, setBackgroundImages] = useState<string[]>([])

  const deleteEvent = (eventId: string) => {
    const newEvents = events.filter((event) => event.id !== eventId)
    setEvents(newEvents)
  }

  const swipeToLike = (id: string) => {
    deleteEvent(currentEventId)
    setCurrentEventId(id)
  }

  const swipeToBad = (id: string) => {
    deleteEvent(currentEventId)
    setCurrentEventId(id)
  }

  const tapEventItem = (index: number) => {}

  const fetchEvents = async () => {
    const results = await EventsRepository.getEventSlideItems()
    setEvents(results)
    setCurrentEventId(results[0].id)
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return {
    events:
      events.length > 0
        ? events
        : [
            {
              id: '',
              title: '',
              prefecture: '',
              startAt: new Date(),
              endAt: new Date(),
              imageUrls: [],
              attendeeCounts: 0,
              recruitPeopleCounts: 0,
              deadline: new Date(),
            },
          ],
    swipeToLike,
    swipeToBad,
    tapEventItem,
  }
}
