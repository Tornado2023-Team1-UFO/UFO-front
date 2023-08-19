import { db } from '@/libs/firebase'
import { doc, deleteDoc } from 'firebase/firestore'

export default async function deleteUser(externalId: string) {
  console.log('id is: ' + externalId)
  const del = async () => {
    deleteDoc(doc(db, 'users', externalId))
      .then(() => console.log('Successfully deleted'))
      .catch((err) => console.log('Error deleting: ' + err))
  }
  return await del
}
