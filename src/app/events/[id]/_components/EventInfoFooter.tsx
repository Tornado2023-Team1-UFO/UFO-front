'use client'
import { useUser } from '@clerk/nextjs'
import { FC } from 'react'
import { toast } from 'react-hot-toast'
import { LikeRepository } from '@/repositories/LikeRepository'
import { UserRepository } from '@/repositories/UserRepository'
import { EventsRepository } from '@/repositories/EventsRepository'
import styles from './eventInfoFooter.module.css'
import { useRouter } from 'next/navigation'

type Props = {
  isLiked: boolean
  isSupported: boolean
  isJoined: boolean
  eventId: string
}

export const EventInfoFooter: FC<Props> = ({ isLiked, isSupported, eventId, isJoined }) => {
  const { isSignedIn, user } = useUser()
  const router = useRouter()

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
    if (isLiked) {
      toast.error('すでにお気に入りに追加済みです')
      return
    }

    toast.success('お気に入りに追加しました')
    addLike(eventId) // update firebase like counts
    user && addToUserFavoriteList(eventId, user.id) // update user's favorite list
  }
  const handleClickParticipate = () => {
    if (!isSignedIn) {
      toast.error('参加登録をするにはログインが必要です')
      return
    }
    if (!user) {
      return // Early return to prevent further execution
    }

    if (isJoined) {
      toast.error('すでに参加登録済みです')
      return
    }

    EventsRepository.addAttendee(eventId, user.id) // update user's favorite list
    toast.success('イベント参加の登録をしました！')
  }

  const clickSupportButton = () => {
    if (!isSignedIn) {
      toast.error('応援をするにはログインが必要です')
      return
    }

    if (!isSupported) {
      toast.error('応援をこのイベントは受け付けていません')
      return
    }

    router.push(`/events/${eventId}/supports`)
  }

  return (
    <>
      <div className={styles.footerContainer}>
        <div>
          <div className={styles.heart} onClick={handleClickLike}>
            <img src='/images/heart.svg' alt='heart' />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={handleClickParticipate}>
            <p className={styles.attend}>参加する</p>
          </button>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.support} onClick={() => clickSupportButton()}>
            応援する
          </button>
        </div>
      </div>
    </>
  )
}
