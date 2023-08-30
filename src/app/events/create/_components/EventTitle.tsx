import { FC } from 'react'
import styles from './eventTitle.module.css'

type Props = {
  title: string
  onChangeTitle: (title: string) => void
}

export const EventTitle: FC<Props> = ({ title, onChangeTitle }) => (
  <div className={styles.input_container}>
    <div
      className={styles.input_box}
      style={{
        backgroundImage: 'url(/images/hukidashi.svg)',
      }}
    >
      <input
        className={styles.input}
        type='text'
        value={title}
        onChange={(e) => onChangeTitle(e.target.value)}
        placeholder='例）バスケしよう!'
      />
    </div>
    <img src='/images/createSub1.svg' alt='イラスト' />
  </div>
)
