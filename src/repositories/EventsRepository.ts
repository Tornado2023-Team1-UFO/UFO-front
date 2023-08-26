import { EventSlideItem } from '@/app/events/swipe/_components/_models/EventSlideItem'
import { db } from '@/libs/firebase'
import { doc, addDoc, collection, getCountFromServer, getDocs, query, setDoc, where } from 'firebase/firestore'
import { FirebaseEventType } from './type'

export const EventsRepository = {
  async getEventSlideItems(category: string): Promise<EventSlideItem[]> {
    const results: EventSlideItem[] = []
    // 開催中のイベントを取得する　０：開催前　１：開催中
    // TODO: orderByを追加する,できればpersonalize化したい
    const ref = query(collection(db, 'events'), where('status', '==', 1), where('category', '==', category))
    const docSnap = await getDocs(ref)

    for (const doc of docSnap.docs) {
      const data = doc.data()
      const attendeesCounts = await this.getAttendeeCount(doc.id)
      const deadLine = data.deadLine.toDate()
      const startAt = data.startAt.toDate()
      const endAt = data.endAt.toDate()

      const item = new EventSlideItem({
        id: doc.id,
        title: data.title,
        prefecture: data.prefecture,
        startAt: startAt,
        endAt: endAt,
        imageUrls: data.imageUrls,
        attendeeCounts: attendeesCounts,
        recruitPeopleCounts: data.recruitPeopleCounts,
        deadline: deadLine,
        eventFee: data.eventFee,
      })
      results.push(item)
    }
    return results
  },

  async postEvent(req: FirebaseEventType): Promise<string> {
    const ref = collection(db, 'events')
    const docRef = await addDoc(ref, req)
    return docRef.id
  },

  // add attendee to event's subcollection(attendees)
  async addAttendee(eventId: string, userId: string): Promise<void> {
    // const ref = collection(db, 'events', eventId, 'attendees')
    await setDoc(doc(db, 'events', eventId, 'attendees', userId), {})
  },

  // get all the attendees from event's subcollection(attendees)
  async getAttendees(eventId: string): Promise<string[]> {
    const attendees: string[] = []
    const querySnapshot = await getDocs(collection(db, 'events', eventId, 'attendees'))
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data())
      attendees.push(doc.id)
    })
    return attendees
  },

  async getAttendeeCount(eventId: string): Promise<number> {
    const ref = query(collection(db, 'events', eventId, 'attendees'))
    const docSnap = await getCountFromServer(ref)
    return docSnap.data().count
  },
}
