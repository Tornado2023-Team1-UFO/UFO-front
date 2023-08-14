import { db } from '@/libs/firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

export const UserRepository = {
  addFavoriteEvent: async (eventId: string, userId: string) => {
    const ref = doc(db, 'users', userId)
    await updateDoc(ref, {
      favoriteEventIds: arrayUnion(eventId), // arrayUnion() adds elements to an array but only elements not already present.
    })
  },
}
