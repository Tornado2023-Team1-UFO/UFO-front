import { useEffect, useState } from 'react'
import { EventSlideItem } from '@/app/events/swipe/_components/_models/EventSlideItem'
import { EventsRepository } from '@/repositories/EventsRepository'
import { LikeRepository } from '@/repositories/LikeRepository'
import { UserRepository } from '@/repositories/UserRepository'
import { auth } from '@/libs/firebase'
import { useSearchParams } from 'next/navigation'

type ReturnType = {
  /*
   * 全てのイベント
   */
  events: EventSlideItem[]
  /*
   * 現在の背景画像のインデックス
   */
  backGroundImageIndex: number
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
  tapEventItem: (backgroundImages: string[]) => void

  category: string
}

export const useSwipeEvent = (): ReturnType => {
  const [events, setEvents] = useState<EventSlideItem[]>([])
  const [currentEventId, setCurrentEventId] = useState('')
  const [backGroundImageIndex, setBackGroundImageIndex] = useState(0)
  const param = useSearchParams()
  const category = param.get('category')
  const deleteEvent = (eventId: string) => {
    const newEvents = events.filter((event) => event.id !== eventId)
    setEvents(newEvents)
  }

  const swipeToLike = async (id: string) => {
    deleteEvent(currentEventId)
    await LikeRepository.addLike(currentEventId)
    await UserRepository.addFavoriteEvent(currentEventId, auth.currentUser?.uid || '')
    setCurrentEventId(id)
    setBackGroundImageIndex(0)
  }

  const swipeToBad = (id: string) => {
    deleteEvent(currentEventId)
    setCurrentEventId(id)
    setBackGroundImageIndex(0)
  }

  const tapEventItem = (backgroundImages: string[]) => {
    const nextIndex = backGroundImageIndex + 1
    const maxIndex = backgroundImages.length - 1
    if (maxIndex < nextIndex) {
      return
    }
    setBackGroundImageIndex(nextIndex)
  }

  const fetchEvents = async () => {
    const results = await EventsRepository.getEventSlideItems(category ?? '')
    {
      results && setEvents(results)
      setCurrentEventId(results[0].id)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return {
    backGroundImageIndex,
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
    category: category ?? '',
  }
}
