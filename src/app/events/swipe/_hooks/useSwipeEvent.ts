import { useEffect, useState } from 'react'
import { EventSlideItem } from '@/app/events/swipe/_components/_models/EventSlideItem'
import { EventsRepository } from '@/repositories/EventsRepository'
import { LikeRepository } from '@/repositories/LikeRepository'
import { UserRepository } from '@/repositories/UserRepository'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { toast } from 'react-hot-toast'
import { Path } from '@/constants/path'
import { PanInfo } from 'framer-motion'

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
  swipeToLike: () => void

  /*
   * Bad側にスワイプしたときの処理
   */
  swipeToBad: () => void

  /*
   * Tapしたときの処理
   */
  tapEventItem: (backgroundImages: string[]) => void

  category: string
  currentEventId: string
  leaveX: number
  onDragEnd: (_e: any, info: PanInfo) => void
  onDragStart: (_e: any, info: PanInfo) => void
  isLoading: boolean
}

export const useSwipeEvent = (): ReturnType => {
  const [events, setEvents] = useState<EventSlideItem[]>([])
  const [currentEventId, setCurrentEventId] = useState('')
  const [backGroundImageIndex, setBackGroundImageIndex] = useState(0)
  const [leaveX, setLeaveX] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const param = useSearchParams()
  let category = param.get('category')
  const type = param.get('type')

  const deleteEvent = (eventId: string) => {
    const newEvents = events.filter((event) => event.id !== eventId)
    setEvents(newEvents)
    return newEvents
  }

  const { userId } = useAuth()
  const router = useRouter()

  const swipeToLike = async () => {
    if (!userId) {
      toast.error('いいねをするにはログインが必要です')
      router.push(Path.SIGNIN)
      return
    }
    const newEvents = deleteEvent(currentEventId)
    await LikeRepository.addLike(currentEventId)
    await UserRepository.addFavoriteEvent(currentEventId, userId || '')
    if (newEvents.length === 0) {
      return
    }
    setCurrentEventId(newEvents[0].id)
    setBackGroundImageIndex(0)
  }

  const swipeToBad = () => {
    const newEvents = deleteEvent(currentEventId)
    if (newEvents.length === 0) {
      return
    }
    setCurrentEventId(newEvents[0].id)
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

  const onDragEnd = (_e: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      swipeToLike()
    } else if (info.offset.x < -100) {
      swipeToBad()
    }

    setLeaveX(0)
  }

  const onDragStart = (_e: any, info: PanInfo) => {
    if (info.offset.x > 0) {
      setLeaveX(1000)
    } else {
      setLeaveX(-1000)
    }
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
    setIsLoading(true)
    try {
      let results: EventSlideItem[] = []
      if (category === '人気上昇中のイベント') {
        results = await EventsRepository.getEventByOrderFavorite()
      } else {
        results = await EventsRepository.getEventSlideItems(category ?? '')
      }
      results && setEvents(results)
      setCurrentEventId(results[0].id)
    } catch (e) {
      console.error(e)
      toast.error('イベントの取得に失敗しました')
    } finally {
      setIsLoading(false)
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
              eventFee: 0,
            },
          ],
    swipeToLike,
    swipeToBad,
    tapEventItem,
    category: category ?? '',
    currentEventId,
    leaveX,
    onDragEnd,
    onDragStart,
    isLoading,
  }
}
