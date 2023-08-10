import { FC, useCallback, useMemo, useState } from 'react'
import { EventSlideItem } from '../_models/EventSlideItem'
import { useSpringCarousel } from 'react-spring-carousel'
import { EvetntItem } from './EventItem'
import { NavigationMenu } from './NavigationMenu'

type Props = {
  events: EventSlideItem[]
  deleteEvent: (eventId: string) => void
}

export const EventItems: FC<Props> = ({ events, deleteEvent }) => {
  if (events.length === 0) return null

  const firstEvent = events[0]
  const [currentEventId, setCurrentEventId] = useState(firstEvent.id)

  const { carouselFragment, useListenToCustomEvent } = useSpringCarousel({
    withLoop: true,
    items: events.map((event) => ({
      id: event.id,
      renderItem: (
        <EvetntItem
          backgrountImageUrl={event.mainImageUrl}
          attendCounts={event.attendCounts}
          likeCounts={event.likeCounts}
        />
      ),
    })),
  })

  // いいねをする、お気に入りに登録する
  // 配列からは削除する
  const swipeToLike = () => {}

  // 配列からは削除する
  const swipeToBad = (id: string) => {
    deleteEvent(currentEventId)
    setCurrentEventId(id)
  }

  useListenToCustomEvent((event) => {
    if (event.eventName === 'onSlideStartChange') {
      switch (event.slideActionType) {
        case 'next':
          swipeToLike()
          break
        case 'prev':
          swipeToBad(event.nextItem.id)
          break
        default:
          break
      }
    }
  })

  return <div>{carouselFragment}</div>
}
