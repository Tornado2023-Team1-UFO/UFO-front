import { FC } from 'react'
import styles from './eventPlaceDetail.module.css'

type Props = {
  prefectures: string[]
  selectedPrefecture: string
  onChangePrefecture: (prefecture: string) => void
}

export const EventPlaceDetail: FC<Props> = ({ prefectures, selectedPrefecture, onChangePrefecture }) => (
  <div className={styles.cards}>
    {prefectures.map((prefecture) => (
      <div
        key={prefecture}
        className={styles.card}
        onClick={() => onChangePrefecture(prefecture)}
        style={{
          backgroundColor: selectedPrefecture === prefecture ? 'var(--primary-color)' : 'var(--secondary-color)',
        }}
      >
        <h1
          style={{
            color: selectedPrefecture === prefecture ? 'var(--secondary-color)' : 'var(--primary-color)',
          }}
          className={styles.card_text}
        >
          {prefecture}
        </h1>
      </div>
    ))}
  </div>
)
