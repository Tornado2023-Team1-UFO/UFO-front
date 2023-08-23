'use client'
import { RedirectToSignIn, useAuth } from '@clerk/nextjs'
import { useFavoriteEvents } from './_hooks/useFavoriteEvents'
import styles from './index.module.css'
import toast from 'react-hot-toast'
import { FiMapPin } from 'react-icons/fi'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { motion } from 'framer-motion'

export default function Page() {
  const { userId } = useAuth()
  const { favoriteEvents, clickFavoriteCard } = useFavoriteEvents()
  if (!userId) {
    toast.error('スタイル診断をするにはログインが必要です')
    return <RedirectToSignIn />
  }

  const formatDate = (startAt: Date, endAt: Date) => {
    dayjs.locale('ja')
    const startDate = dayjs(startAt).format('YYYY/MM/DD(ddd)')
    const endDate = dayjs(endAt).format('MM/DD(ddd)')
    return `${startDate}〜${endDate}`
  }

  return (
    <div className={styles.container}>
      <div className={styles.title_button}>
        <h1 className={styles.title}>お気に入りの</h1>
      </div>
      <div className={styles.title_button2}>
        <h1 className={styles.title}>イベント一覧</h1>
      </div>
      {favoriteEvents.length === 0 ? (
        <p className={styles.no_favorite}>お気に入りのイベントはありません</p>
      ) : (
        <div className={styles.cards}>
          {favoriteEvents.map((event, i) => (
            <div key={event.id} className={styles.card} onClick={() => clickFavoriteCard(event.id)}>
              {(i - 1) % 6 === 0 && (
                <motion.div
                  animate={{
                    scale: [1, 2, 2, 1, 1],
                  }}
                >
                  <img src='/images/favoriteText1.svg' alt='笑う' className={styles.text1} />
                </motion.div>
              )}
              {(i - 1) % 6 === 2 && (
                <motion.div animate={{ x: [5, 0, -5, 0] }} transition={{ ease: 'easeOut', duration: 1 }}>
                  <img src='/images/favoriteText2.svg' alt='キュン' className={styles.text2} />
                </motion.div>
              )}
              {(i - 1) % 6 === 4 && <img src='/images/favoriteText3.svg' alt='カメラ' className={styles.text3} />}
              <div className={styles.card_container}>
                <div className={styles.card_image} style={{ backgroundImage: `url(${event.imageUrls[0]})` }}>
                  <div className={styles.prefecture}>
                    <FiMapPin size={10} />
                    {event.prefecture}
                  </div>
                </div>
                <div></div>
                <div className={styles.card_content}>
                  <h1 className={styles.card_title}>{event.title}</h1>
                  <p className={styles.card_date}>{formatDate(event.startAt, event.endAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
