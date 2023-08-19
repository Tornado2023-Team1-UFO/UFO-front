import { FC } from 'react'
import styles from './eventCategory.module.css'
import { EVENT_CATEGORY_MASTER } from '../_constants/categories'

type Props = {
  selectedCategory: string[]
  onClickCategory: (selectedCategory: string) => void
}

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
