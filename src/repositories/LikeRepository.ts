import { db } from '@/libs/firebase'
import { doc, increment, updateDoc } from 'firebase/firestore'

export const LikeRepository = {
  addLike: async (eventId: string) => {
    const ref = doc(db, 'events', eventId)
    await updateDoc(ref, {
      likeCounts: increment(1),
    })
    // 1秒間に一回しか叩けないので、1秒待つ
    // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ja#increment_a_numeric_value
    await setTimeout(() => {}, 1000)
  },
}
