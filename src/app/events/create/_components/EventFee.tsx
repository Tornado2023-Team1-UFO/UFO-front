import { FC } from 'react'
import { Title } from './common/Title'
import styles from './eventFee.module.css'

type Props = {
  eventFee: number
  onChangeEventFee: (eventFee: number) => void
  onClickPrev: () => void
  onClickNext: () => void
}

export const EventFee: FC<Props> = ({ eventFee, onChangeEventFee, onClickNext, onClickPrev }) => (
  <div className={styles.content}>
    <Title title='１人あたりの参加費は？' />
    <div className={styles.input_box}>
      <input
        className={styles.input_box}
        type='number'
        value={eventFee > 0 ? eventFee : ''}
        onChange={(e) => onChangeEventFee(Number(e.target.value))}
      />
    </div>
  </div>
)
