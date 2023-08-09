import { EventSlideItem } from '@/app/event/_models/EventSlideItem'
import { db } from '@/libs/firebase'
import { collection, getCountFromServer, getDocs, query, where } from 'firebase/firestore'

export const EventsRepository = {
  async getEventSlideItems(): Promise<EventSlideItem[]> {
    const results: EventSlideItem[] = []
    const ref = query(collection(db, 'events'), where('status', '==', 1))
    const docSnap = await getDocs(ref)

    for (const doc of docSnap.docs) {
      const data = doc.data()
      const attendeesCounts = await this.getAttendeeCount(doc.id)
      const deadLine = data.deadLine.toDate()
      const item = new EventSlideItem(
        doc.id,
        data.title,
        data.likeCounts,
        data.address,
        data.mainImageUrl,
        data.categories,
        attendeesCounts,
        deadLine,
      )
      results.push(item)
    }
    return results
  },

  async getAttendeeCount(eventId: string): Promise<number> {
    const ref = query(collection(db, 'events', eventId, 'attendees'))
    const docSnap = await getCountFromServer(ref)
    return docSnap.data().count
  },
}
