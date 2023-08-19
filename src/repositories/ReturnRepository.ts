import { SupportProduct } from '@/app/events/[id]/supports/_models/SupportProduct'
import { Return } from '@/app/events/create/_hooks/useEventCreate'
import { db } from '@/libs/firebase'
import { collection, getDocs, orderBy, query, doc, setDoc, addDoc } from 'firebase/firestore'

export const ReturnRepository = {
  getReturns: async (eventId: string): Promise<SupportProduct[]> => {
    let results: SupportProduct[] = []
    const ref = query(collection(db, 'events', eventId, 'returns'), orderBy('amount', 'asc'))
    const snapshot = await getDocs(ref)
    snapshot.forEach((doc) => {
      const product = doc.data()
      const supportProduct = new SupportProduct({
        id: doc.id,
        name: product.name,
        amount: product.amount,
        imageUrl: product.imageUrl,
        nickname: product.nickname,
        content: product.content,
        quantity: 1,
        isChecked: false,
      })

      results.push(supportProduct)
    })

    return results
  },

  postReturn: async (eventId: string, returns: Return[]): Promise<void> => {
    const ref = collection(db, 'events', eventId, 'returns')

    for (const r of returns) {
      await addDoc(ref, r)
    }
  },
}
