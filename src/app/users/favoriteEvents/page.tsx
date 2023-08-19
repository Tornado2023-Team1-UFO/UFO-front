'use client'
import { useFavoriteEvents } from './_hooks/useFavoriteEvents'
import styles from './index.module.css'

export default function Page() {
  const { favoriteEvents, clickFavoriteCard } = useFavoriteEvents()
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>お気に入りのイベント一覧</h1>
      {favoriteEvents.length === 0 ? (
        <p className={styles.no_favorite}>お気に入りのイベントはありません</p>
      ) : (
        <div className={styles.cards}>
          {favoriteEvents.map((event) => (
            <div
              key={event.id}
              className={styles.card}
              style={{ backgroundImage: `url(${event.imageUrls[0]})` }}
              onClick={() => clickFavoriteCard(event.id)}
            >
              <h1 className={styles.card_title}>{event.title}</h1>
              <img className={styles.heart} src='/images/heart.svg' alt='heart' />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
