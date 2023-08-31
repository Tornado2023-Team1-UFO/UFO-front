import { Timestamp } from 'firebase/firestore'

export type FirebaseEventType = {
  title: string
  userId: string
  status: 1 | 0
  content: string
  eventFee: number
  prefecture: string
  startAt: Timestamp
  endAt: Timestamp
  deadLine: Timestamp
  likeCounts: number
  imageUrls: string[]
  recruitPeopleCounts: number
  updatedAt: Timestamp
  category: string
  categories: string[]
  twitterLink?: string
  instagramLink?: string
  applyLink?: string
}
