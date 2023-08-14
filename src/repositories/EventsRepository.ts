import { EventSlideItem } from '@/app/event/_models/EventSlideItem'
import { db } from '@/libs/firebase'
import { addDoc, collection, getCountFromServer, getDocs, query, where } from 'firebase/firestore'

export const EventsRepository = {
  async getEventSlideItems(): Promise<EventSlideItem[]> {
    const results: EventSlideItem[] = []
    // 開催中のイベントを取得する　０：開催前　１：開催中
    // TODO: orderByを追加する,できればpersonalize化したい
    const ref = query(collection(db, 'events'), where('status', '==', 1))
    const docSnap = await getDocs(ref)

    for (const doc of docSnap.docs) {
      const data = doc.data()
      const attendeesCounts = await this.getAttendeeCount(doc.id)
      const deadLine = data.deadLine.toDate()
      const startAt = data.startAt.toDate()
      const endAt = data.endAt.toDate()
      // 締切が過ぎるとイベントが表示されないようにする
      if (deadLine < new Date()) {
        break
      }
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
      })
      results.push(item)
    }
    return results
  },

  async postEvent(req: FirebaseEventType): Promise<void> {
    const ref = collection(db, 'events')

    await addDoc(ref, req)
  },

  async getAttendeeCount(eventId: string): Promise<number> {
    const ref = query(collection(db, 'events', eventId, 'attendees'))
    const docSnap = await getCountFromServer(ref)
    return docSnap.data().count
  },
}
