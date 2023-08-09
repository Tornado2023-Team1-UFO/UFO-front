export class EventSlideItem {
  id: string
  title: string
  likeCounts: number
  address: string
  mainImageUrl: string
  categories: string[]
  attendCounts: number
  deadline: Date

  constructor(
    id: string,
    title: string,
    likeCounts: number,
    address: string,
    mainImageUrl: string,
    categories: string[],
    attendCounts: number,
    deadline: Date,
  ) {
    this.id = id
    this.title = title
    this.likeCounts = likeCounts
    this.address = address
    this.mainImageUrl = mainImageUrl
    this.categories = categories
    this.attendCounts = attendCounts
    this.deadline = deadline
  }
}
