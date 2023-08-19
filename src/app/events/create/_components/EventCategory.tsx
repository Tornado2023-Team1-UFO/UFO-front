import { FC } from 'react'
import styles from './eventCategory.module.css'

type Props = {
  selectedCategory: string[]
  onClickCategory: (selectedCategory: string) => void
}

const EVENT_CATEGORY_MASTER = [
  'IT・開発',
  'スポーツ',
  '音楽',
  '芸術',
  'デザイン',
  'ファッション',
  '料理',
  'ゲーム',
  'カフェ',
  '山',
  '海',
  '映画',
  '旅行',
  '哲学',
  '語学',
  '車',
  'カメラ',
  '食べ歩き',
  '散歩',
  'お笑い',
  'アニメ',
  '交流会',
  'プログラミング',
  'その他',
]

export const EventCategory: FC<Props> = ({ selectedCategory, onClickCategory }) => (
  <div className={styles.container}>
    {EVENT_CATEGORY_MASTER.map((category) => (
      <div
        key={category}
        style={{
          backgroundColor: selectedCategory.includes(category) ? 'skyblue' : '#ffffff',
        }}
        className={styles.card}
        onClick={() => onClickCategory(category)}
      >
        {category}
      </div>
    ))}
  </div>
)
