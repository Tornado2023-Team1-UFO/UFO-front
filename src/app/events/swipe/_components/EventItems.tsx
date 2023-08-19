import { FC } from 'react'
import { useSpringCarousel } from 'react-spring-carousel'
import { EvetntItem } from './EventItem'
import { NavigationMenu } from './NavigationMenu'
import { useSwipeEvent } from '../_hooks/useSwipeEvent'
import { EventTag } from '@/components/EventTag'

export const EventItems: FC = () => {
  const { backGroundImageIndex, events, swipeToLike, swipeToBad, tapEventItem, category } = useSwipeEvent()

  const { carouselFragment, useListenToCustomEvent, slideToNextItem, slideToPrevItem } = useSpringCarousel({
    withLoop: true,
    items: events.map((event) => ({
      initialActiveItem: 1,
      id: event.id,
      renderItem: (
        <EvetntItem
          title={event.title}
          prefecture={event.prefecture}
          attendeeCounts={event.attendeeCounts}
          recruitPeopleCounts={event.recruitPeopleCounts}
          startAt={event.startAt}
          endAt={event.endAt}
          backgroundImages={event.imageUrls}
          currentIndex={backGroundImageIndex}
          onTapEvent={tapEventItem}
        />
      ),
    })),
  })

  useListenToCustomEvent(async (event) => {
    if (event.eventName === 'onSlideStartChange') {
      switch (event.slideActionType) {
        case 'next':
          await swipeToBad(event.nextItem.id)
          break
        case 'prev':
          await swipeToLike(event.nextItem.id)
          break
        default:
          break
      }
    }
  })

  return (
    <div>
      <EventTag title={category} />
      {carouselFragment}
      <NavigationMenu onClickBack={slideToNextItem} onClickHeart={slideToPrevItem} />
    </div>
  )
}
