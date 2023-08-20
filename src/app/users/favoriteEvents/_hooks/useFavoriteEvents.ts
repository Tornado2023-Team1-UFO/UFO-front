import { useEffect, useState } from 'react'
import { FavoriteEvents } from '../_models/favoriteEvent'
import { UserRepository } from '@/repositories/UserRepository'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export const useFavoriteEvents = () => {
  const [favoriteEvents, setFavoriteEvents] = useState<FavoriteEvents>([])
  const { userId } = useAuth()
  const router = useRouter()

  const fetchfavoriteEvents = async () => {
    if (!userId) {
      return
    }
    const favoriteEvents = await UserRepository.getFavoriteEvents(userId)
    setFavoriteEvents(favoriteEvents)
  }

  const clickFavoriteCard = (id: string) => {
    router.push(`/events/${id}`)
  }

  useEffect(() => {
    fetchfavoriteEvents()
  }, [])

  return {
    favoriteEvents,
    clickFavoriteCard,
  }
}
