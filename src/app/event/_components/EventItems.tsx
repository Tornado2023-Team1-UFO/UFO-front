import { FC } from 'react'
import { useSpringCarousel } from 'react-spring-carousel'
import { EvetntItem } from './EventItem'
import { NavigationMenu } from './NavigationMenu'
import { useSwipeEvent } from '../_hooks/useSwipeEvent'

export const EventItems: FC = () => {
  const { events, swipeToLike, swipeToBad } = useSwipeEvent()

  const { carouselFragment, useListenToCustomEvent } = useSpringCarousel({
    withLoop: true,
    items: events.map((event) => ({
      id: event.id,
      renderItem: (
        <EvetntItem
          backgrountImageUrl={event.imageUrls[0]}
          title={event.title}
          prefecture={event.prefecture}
          attendeeCounts={event.attendeeCounts}
          recruitPeopleCounts={event.recruitPeopleCounts}
          startAt={event.startAt}
          endAt={event.endAt}
          backgroundImages={event.imageUrls}
        />
      ),
    })),
  })

  useListenToCustomEvent((event) => {
    if (event.eventName === 'onSlideStartChange') {
      switch (event.slideActionType) {
        case 'next':
          swipeToLike(event.nextItem.id)
          break
        case 'prev':
          swipeToBad(event.nextItem.id)
          break
        default:
          break
      }
    }
  })

  return (
    <div>
      {carouselFragment}
      <NavigationMenu />
    </div>
  )
}
