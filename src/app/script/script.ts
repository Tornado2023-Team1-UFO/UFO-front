import { db } from '@/libs/firebase'

type fireBaseEvent = {
  askingMaxFee: number
  askingMinFee: number
  categories: string[]
  content: string
  cost: number
  createdAt: Date
  deadLine: Date
  endAt: Date
  imageUrls: string[]
  likeCounts: number
  outline: string
  prefecture: string
  recruitPeopleCounts: number
  startAt: Date
  status: number
  title: string
  updatedAt: Date
  userId: string
}

function addEventToFireBase() {}

import { doc, setDoc } from 'firebase/firestore'

// Add a new document in collection "cities"
await setDoc(doc(db, 'cities', 'LA'), {
  name: 'Los Angeles',
  state: 'CA',
  country: 'USA',
})
