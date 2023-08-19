import { FavoriteEvents } from '@/app/users/favoriteEvents/_models/favoriteEvent'
import { db } from '@/libs/firebase'
import { arrayUnion, doc, updateDoc, getDoc } from 'firebase/firestore'
import { FirebaseEventType } from './type'
import { th } from '@faker-js/faker'

export const UserRepository = {
  addFavoriteEvent: async (eventId: string, userId: string) => {
    const ref = doc(db, 'users', userId)
    await updateDoc(ref, {
      favoriteEventIds: arrayUnion(eventId), // arrayUnion() adds elements to an array but only elements not already present.
    })
  },

  getFavoriteEvents: async (userId: string): Promise<FavoriteEvents> => {
    const ref = doc(db, 'users', userId)
    const docSnap = await getDoc(ref)

    if (!docSnap.exists()) {
      return []
    }
    const eventIds: string[] = docSnap.data().favoriteEventIds

    if (!eventIds) {
      return []
    }
    const results: FavoriteEvents = []
    for (const eventId of eventIds) {
      const ref = doc(db, 'events', eventId)
      const docSnap = await getDoc(ref)
      const data = docSnap.data()

      if (!data) {
        throw new Error('Event not found')
      }

      const imageUrls: string[] = data.imageUrls
      const title: string = data.title
      const likeCounts: number = data.likeCounts

      const item = {
        id: eventId,
        imageUrls: imageUrls,
        title: title,
        likeCounts: likeCounts,
      }
      results.push(item)
    }

    return results
  },
}
