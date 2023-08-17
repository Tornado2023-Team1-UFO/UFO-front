import { User } from 'firebase/auth'
import { auth, db } from '@/libs/firebase'
import { setDoc, doc, Timestamp } from 'firebase/firestore'

export default async function upsert(externalId: string, attributes: any) {
  const name = attributes.firstname + ' ' + attributes.lastname
  const email = attributes.email_addresses[0].email_address
  const photoURL = attributes.image_url
  const createdAt = attributes.created_at
  const updatedAt = attributes.updated_at

  const registerUser = async () => {
    const adminRef = doc(db, 'users', externalId)
    await setDoc(adminRef, {
      name: name,
      email: email,
      photoURL: photoURL,
      createdAt: createdAt,
      updatedAt: updatedAt,
    })
  }
  return await registerUser()
}
