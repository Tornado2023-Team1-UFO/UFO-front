import { FC } from 'react'
import { NavigationMenu } from './NavigationMenu'
import { useSwipeEvent } from '../_hooks/useSwipeEvent'
import { EventTag } from '@/components/EventTag'
import styles from './eventItems.module.css'
import { AnimatePresence } from 'framer-motion'
import { EventItem } from './EventItem'
import { Loading } from '../../create/_components/Loading'

export const EventItems: FC = () => {
  const {
    backGroundImageIndex,
    events,
    swipeToLike,
    swipeToBad,
    tapEventItem,
    category,
    currentEventId,
    leaveX,
    onDragStart,
    onDragEnd,
    isLoading,
  } = useSwipeEvent()

  if (isLoading) {
    return null
  }

  return (
    <div className={styles.container}>
      <EventTag title={category} />
      <AnimatePresence>
        {events.map((event, index) => (
          <EventItem
            isActive={currentEventId === event.id}
            key={event.id}
            event={event}
            currentIndex={backGroundImageIndex}
            onTapEvent={tapEventItem}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            leaveX={leaveX}
          />
        ))}
      </AnimatePresence>
      <NavigationMenu onClickBack={swipeToBad} onClickHeart={swipeToLike} />
    </div>
  )
}
