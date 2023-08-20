'use client'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { LikeRepository } from '@/repositories/LikeRepository'
import { UserRepository } from '@/repositories/UserRepository'
import { EventsRepository } from '@/repositories/EventsRepository'
import { FaHeart } from 'react-icons/fa6'
import styles from './eventInfoFooter.module.css'

export default function EventInfoFooter(props: any) {
  const [liked, setLiked] = useState(false)
  const [isAttendee, setIsAttendee] = useState(false)
  const { eventId, likeCounts } = props
  const [eventLikeCounts, setEventLikeCounts] = useState(likeCounts)
  const { isSignedIn, user } = useUser()
  console.log(eventId)
  useEffect(() => {
    if (user) {
      const fetchLikedEvents = async () => {
        const likedEvents = await UserRepository.getFavoriteEvents(user.id)
        const likedEventIds = likedEvents.map((event: any) => event.id)
        if (likedEventIds.includes(eventId)) {
          setLiked(true)
        }
      }
      const fetchEventsAttendees = async () => {
        const eventsAttendees = await EventsRepository.getAttendees(eventId)
        if (eventsAttendees.includes(eventId)) {
          setIsAttendee(true)
        }
      }
      fetchLikedEvents()
    }
  }, [])
  const addLike = async (id: string) => {
    await LikeRepository.addLike(id)
  }
  const addToUserFavoriteList = async (id: string, userID: string) => {
    await UserRepository.addFavoriteEvent(id, userID)
  }
  const handleClickLike = () => {
    if (!isSignedIn) {
      toast.error('お気に入りに追加するにはログインが必要です')
    }
    if (!user) {
      return // Early return to prevent further execution
    }
    !liked ? setLiked(true) : setLiked(false)
    if (!liked) {
      toast.success('お気に入りに追加しました')
      addLike(eventId) // update firebase like counts
      user && addToUserFavoriteList(eventId, user.id) // update user's favorite list
      setEventLikeCounts(eventLikeCounts + 1)
    } else {
      toast.error('そのイベントはすでにお気に入りに登録しています')
    }
  }
  const handleClickParticipate = () => {
    if (!isSignedIn) {
      toast.error('参加登録をするにはログインが必要です')
    }
    if (!user) {
      return // Early return to prevent further execution
    }
    if (!isAttendee) {
      EventsRepository.addAttendee(eventId, user.id) // update user's favorite list
      toast.success('イベント参加の登録をしました！')
    }
  }

  return (
    <>
      <div className={styles.footerContainer}>
        <div>
          <div onClick={handleClickLike}>
            <FaHeart />
          </div>
          <p>{eventLikeCounts}</p>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={handleClickParticipate}>
            <p>参加する</p>
          </button>
        </div>
        <div className={styles.buttonContainer}>
          <button>
            <Link href='/events/supports'>応援する</Link>
          </button>
        </div>
      </div>
    </>
  )
}
