import { db } from '@/libs/firebase'
import { collection, getCountFromServer, getDocs, query, where } from 'firebase/firestore'
import { EventSlideItem } from '@/app/event/_components/_models/EventSlideItem'

export async function queryEvents(category: string): Promise<EventSlideItem[]> {
  const results: EventSlideItem[] = []
  // 開催中のイベントを取得する　０：開催前　１：開催中
  const ref = query(collection(db, 'events'), where('status', '==', 1), where('randomCategory', '==', category))
  const docSnap = await getDocs(ref)
  for (const doc of docSnap.docs) {
    const data = doc.data()
    const attendeesCounts = await getAttendeeCount(doc.id)
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
}
async function getAttendeeCount(eventId: string): Promise<number> {
  const ref = query(collection(db, 'events', eventId, 'attendees'))
  const docSnap = await getCountFromServer(ref)
  return docSnap.data().count
}