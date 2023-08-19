import { db } from '@/libs/firebase'
import { setDoc, doc, Timestamp } from 'firebase/firestore'

export default async function upsert(externalId: string, attributes: any) {
  console.log(attributes)
  const lastname = attributes.last_name !== null ? attributes.last_name : ''
  const name = attributes.first_name + ' ' + lastname
  const email = attributes.email_addresses[0].email_address
  const photoURL = attributes.image_url
  console.log(new Date(attributes.created_at))
  const createdAt = Timestamp.fromDate(new Date(attributes.created_at))
  const updatedAt = Timestamp.fromDate(new Date(attributes.updated_at))

  const registerUser = async () => {
    const adminRef = doc(db, 'users', externalId)
    await setDoc(adminRef, {
      id: externalId,
      name: name,
      email: email,
      photoURL: photoURL,
      createdAt: createdAt,
      updatedAt: updatedAt,
      favoriteEventIds: [],
    })
      .then(() => {
        console.log('Successfully registered')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return await registerUser()
}
