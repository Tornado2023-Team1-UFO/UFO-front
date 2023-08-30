export class EventItem {
  id!: string
  title!: string
  prefecture!: string
  startAt!: Date
  endAt!: Date
  imageUrls!: string[]
  attendeeCounts!: number
  recruitPeopleCounts!: number
  deadline!: Date
  eventFee!: number
  description!: string
  categories!: string[]
  isLiked!: boolean
  organizer!: {
    name: string
    iconUrl: string
  }
  isSupported!: boolean
  isJoined!: boolean

  constructor(event: Partial<EventItem>) {
    Object.assign(this, event)
  }
}
