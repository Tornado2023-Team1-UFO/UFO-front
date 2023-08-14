import CategoryHeadLine from './CategoryHeadLine'
import styles from './EventContainer.module.css'
import EventCard from './EventCard'
export default function EventContainer(props: any) {
  const { category } = props
  return (
    <>
      <div className='eventcontainer'>
        <CategoryHeadLine title={category} />
        <div className={styles.cardcontainer}>
          {/* only show if there's data  */}
          {eventData &&
            eventData.map((item) => (
              <EventCard key={item.id} title={item.title} date={item.date} attendees={item.attendees} />
            ))}
          {eventData && eventData.length === 0 && <p>There are no events</p>}
        </div>
      </div>
    </>
  )
}
let eventData = [
  {
    id: 1,
    title: 'Event 1',
    date: '2021-10-10',
    attendees: 100,
  },
  {
    id: 2,
    title: 'Event 2',
    date: '2021-10-10',
    attendees: 100,
  },
  {
    id: 3,
    title: 'Event 3',
    date: '2021-10-10',
    attendees: 100,
  },
  {
    id: 4,
    title: 'Event 4',
    date: '2021-10-10',
    attendees: 100,
  },
  {
    id: 5,
    title: 'Event 5',
    date: '2021-10-10',
    attendees: 100,
  },
  {
    id: 6,
    title: 'Event 6',
    date: '2021-10-10',
    attendees: 100,
  },
]
