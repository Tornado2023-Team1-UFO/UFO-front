export class EventSlideItem {
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

  constructor(event: Partial<EventSlideItem>) {
    Object.assign(this, event)
  }
}
