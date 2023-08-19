import { FC } from 'react'
import styles from './EventPlaceDetail.module.css'

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
          backgroundColor: selectedPrefecture === prefecture ? 'skyblue' : '#ffffff',
        }}
      >
        <h1 className={styles.card_text}>{prefecture}</h1>
      </div>
    ))}
  </div>
)
