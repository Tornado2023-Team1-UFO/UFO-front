import { EventSlideItem } from '@/app/events/swipe/_components/_models/EventSlideItem'
import { db } from '@/libs/firebase'
import {
  doc,
  addDoc,
  collection,
  getCountFromServer,
  getDocs,
  query,
  setDoc,
  where,
  orderBy,
  getDoc,
} from 'firebase/firestore'
import { FirebaseEventType } from './type'
import { EventItem } from '@/app/events/[id]/_model/event'
import { UserRepository } from './UserRepository'

export const EventsRepository = {
  // いいね順にイベントを取得する
  async getEventByOrderFavorite(prefecture?: string, keyword?: string): Promise<EventSlideItem[]> {
    const results: EventSlideItem[] = []

    let ref = query(collection(db, 'events'), where('status', '==', 1), orderBy('likeCounts', 'desc'))
    if (prefecture && keyword) {
      ref = query(
        collection(db, 'events'),
        where('status', '==', 1),
        where('prefecture', '==', prefecture),
        where('title', '==', keyword),
        orderBy('likeCounts', 'desc'),
      )
    } else if (prefecture) {
      ref = query(
        collection(db, 'events'),
        where('status', '==', 1),
        where('prefecture', '==', prefecture),
        orderBy('likeCounts', 'desc'),
      )
    } else if (keyword) {
      ref = query(
        collection(db, 'events'),
        where('status', '==', 1),
        where('title', '==', keyword),
        orderBy('likeCounts', 'desc'),
      )
    }

    const docSnap = await getDocs(ref)

    for (const doc of docSnap.docs) {
      const data = doc.data()
      const attendeesCounts = await this.getAttendeeCount(doc.id)
      const deadLine = data.deadLine.toDate()
      const startAt = data.startAt.toDate()
      const endAt = data.endAt.toDate()

      const item = new EventSlideItem({
        id: doc.id,
        title: data.title,
        prefecture: data.prefecture,
        startAt: startAt,
        endAt: endAt,
        imageUrls: data.imageUrls,
        attendeeCounts: attendeesCounts,
        recruitPeopleCounts: data.recruitPeopleCounts,
        deadline: deadLine,
        eventFee: data.eventFee,
      })
      results.push(item)
    }
    return results
  },

  async getEvent(eventId: string, userId: string): Promise<EventItem> {
    const docRef = doc(db, 'events', eventId)
    const docSnap = await getDoc(docRef)
    const data = docSnap.data() as FirebaseEventType
    const organizer = doc(db, 'users', data.userId)
    const organizerSnap = await getDoc(organizer)
    const organizerData = organizerSnap.data()

    const favoriteItems = await UserRepository.getFavoriteEvents(userId)
    const isLiked = favoriteItems.filter((item) => item.id === eventId).length > 0

    const attendees = await this.getAttendees(eventId)
    const isJoined = attendees.filter((item) => item === userId).length > 0
    const event = new EventItem({
      id: eventId,
      title: data.title,
      prefecture: data.prefecture,
      startAt: data.startAt.toDate(),
      endAt: data.endAt.toDate(),
      imageUrls: data.imageUrls,
      attendeeCounts: await this.getAttendeeCount(docSnap.id),
      recruitPeopleCounts: data.recruitPeopleCounts,
      deadline: data.deadLine.toDate(),
      eventFee: data.eventFee,
      description: data.content,
      categories: data.categories,
      isLiked: isLiked,
      organizer: {
        name: organizerData?.name,
        iconUrl: organizerData?.photoURL,
      },
      isSupported: (await this.getReturnsCount(eventId)) > 0,
      isJoined: isJoined,
    })

    return event
  },

  async getEventSlideItems(category: string): Promise<EventSlideItem[]> {
    const results: EventSlideItem[] = []
    // 開催中のイベントを取得する　０：開催前　１：開催中
    // TODO: orderByを追加する,できればpersonalize化したい
    const ref = query(collection(db, 'events'), where('status', '==', 1), where('category', '==', category))
    const docSnap = await getDocs(ref)

    for (const doc of docSnap.docs) {
      const data = doc.data()
      const attendeesCounts = await this.getAttendeeCount(doc.id)
      const deadLine = data.deadLine.toDate()
      const startAt = data.startAt.toDate()
      const endAt = data.endAt.toDate()

      const item = new EventSlideItem({
        id: doc.id,
        title: data.title,
        prefecture: data.prefecture,
        startAt: startAt,
        endAt: endAt,
        imageUrls: data.imageUrls,
        attendeeCounts: attendeesCounts,
        recruitPeopleCounts: data.recruitPeopleCounts,
        deadline: deadLine,
        eventFee: data.eventFee,
      })
      results.push(item)
    }
    return results
  },

  async postEvent(req: FirebaseEventType): Promise<string> {
    const ref = collection(db, 'events')
    const docRef = await addDoc(ref, req)
    return docRef.id
  },

  // add attendee to event's subcollection(attendees)
  async addAttendee(eventId: string, userId: string): Promise<void> {
    // const ref = collection(db, 'events', eventId, 'attendees')
    await setDoc(doc(db, 'events', eventId, 'attendees', userId), {})
  },

  // get all the attendees from event's subcollection(attendees)
  async getAttendees(eventId: string): Promise<string[]> {
    const attendees: string[] = []
    const querySnapshot = await getDocs(collection(db, 'events', eventId, 'attendees'))
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      attendees.push(doc.id)
    })
    return attendees
  },

  async getAttendeeCount(eventId: string): Promise<number> {
    const ref = query(collection(db, 'events', eventId, 'attendees'))
    const docSnap = await getCountFromServer(ref)
    return docSnap.data().count
  },

  async getReturnsCount(eventId: string): Promise<number> {
    const ref = query(collection(db, 'events', eventId, 'returns'))
    const docSnap = await getCountFromServer(ref)
    return docSnap.data().count
  },
}
