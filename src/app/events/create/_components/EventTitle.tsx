import { FC } from 'react'
import styles from './EventTitle.module.css'

type Props = {
  title: string
  onChangeTitle: (title: string) => void
}

export const EventTitle: FC<Props> = ({ title, onChangeTitle }) => (
  <div className={styles.input_container}>
    <input
      className={styles.input_box}
      type='text'
      value={title}
      onChange={(e) => onChangeTitle(e.target.value)}
      placeholder='例）バスケしよう、Hack Tokyo'
    />
  </div>
)
