import { useEffect, useState } from 'react'
import { EventSlideItem } from '@/app/events/swipe/_components/_models/EventSlideItem'
import { EventsRepository } from '@/repositories/EventsRepository'
import { LikeRepository } from '@/repositories/LikeRepository'
import { UserRepository } from '@/repositories/UserRepository'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { toast } from 'react-hot-toast'
import { Path } from '@/constants/path'

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
  let category = param.get('category')
  const type = param.get('type')

  const deleteEvent = (eventId: string) => {
    const newEvents = events.filter((event) => event.id !== eventId)
    setEvents(newEvents)
  }

  const { userId } = useAuth()
  const router = useRouter()

  const swipeToLike = async (id: string) => {
    if (!userId) {
      toast.error('いいねをするにはログインが必要です')
      router.push(Path.SIGNIN)
      return
    }
    deleteEvent(currentEventId)
    await LikeRepository.addLike(currentEventId)
    await UserRepository.addFavoriteEvent(currentEventId, userId || '')
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
    if (type === 'a' || type === 'b' || type === 'c' || type === 'd') {
      switch (type) {
        case 'a':
          category = '夏の成長体験'
          break
        case 'b':
          category = '仲間とハジける'
          break
        case 'c':
          category = 'インドアなヲタク集合!'
          break
        case 'd':
          category = '新しい自分に出会う'
          break
      }
    }
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
