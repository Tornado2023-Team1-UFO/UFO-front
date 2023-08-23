type FavoriteEvent = {
  id: string
  imageUrls: string[]
  title: string
  prefecture: string
  startAt: Date
  endAt: Date
}

export type FavoriteEvents = FavoriteEvent[]
