import Link from 'next/link'
import { FC } from 'react'
import { Title } from './common/Title'
import styles from './eventTitle.module.css'
import { PrevButton } from './common/PrevButton'

type Props = {
  title: string
  onChangeTitle: (title: string) => void
}

export const EventTitle: FC<Props> = ({ title, onChangeTitle }) => (
  <div className={styles.container}>
    <Title title='イベントタイトルは？' />
    <div className={styles.input_container}>
      <input className={styles.input_box} type='text' value={title} onChange={(e) => onChangeTitle(e.target.value)} />
    </div>
  </div>
)
