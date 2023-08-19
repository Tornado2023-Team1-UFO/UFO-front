import { EventSlideItem } from '@/app/events/swipe/_models/EventSlideItem'
import { db } from '@/libs/firebase'
import { arrayUnion, doc, updateDoc, getDoc } from 'firebase/firestore'

export const UserRepository = {
  addFavoriteEvent: async (eventId: string, userId: string) => {
    const ref = doc(db, 'users', userId)
    await updateDoc(ref, {
      favoriteEventIds: arrayUnion(eventId), // arrayUnion() adds elements to an array but only elements not already present.
    })
  },

  getFavoriteEvents: async (userId: string): Promise<EventSlideItem[]> => {
    const ref = doc(db, 'users', userId)
    const docSnap = await getDoc(ref)

    if (!docSnap.exists()) {
      return []
    }
    const eventIds = docSnap.data().favoriteEventIds

    return eventIds.map(async (eventId: string) => {
      const ref = doc(db, 'events', eventId)
      const docSnap = await getDoc(ref)
      const data = docSnap.data()

      if (!data) return
      const deadLine = data.deadLine.toDate()
      const startAt = data.startAt.toDate()
      const endAt = data.endAt.toDate()

      const item = new EventSlideItem({
        id: docSnap.id,
        title: data.title,
        prefecture: data.prefecture,
        startAt: startAt,
        endAt: endAt,
        imageUrls: data.imageUrls,
        attendeeCounts: 0,
        recruitPeopleCounts: data.recruitPeopleCounts,
        deadline: deadLine,
      })

      return item
    })
  },
}
