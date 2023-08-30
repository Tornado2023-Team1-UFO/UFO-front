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
          backgroundColor: selectedCategory.includes(category)
            ? 'var(--light-primary-color-3)'
            : 'var(--secondary-color)',

          color: selectedCategory.includes(category) ? 'var(--secondary-color)' : 'var(--light-primary-color)',
        }}
        className={styles.card}
        onClick={() => onClickCategory(category)}
      >
        {category}
      </div>
    ))}
  </div>
)
