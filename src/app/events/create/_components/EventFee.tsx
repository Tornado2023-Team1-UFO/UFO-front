import { FC } from 'react'

type Props = {
  eventFee: number
  onChangeEventFee: (eventFee: number) => void
  onClickNext: () => void
}

export const EventFee: FC<Props> = ({ eventFee, onChangeEventFee, onClickNext }) => (
  <div>
    イベントの参加費
    <input
      style={{ backgroundColor: 'white' }}
      type='number'
      value={eventFee > 0 ? eventFee : ''}
      onChange={(e) => onChangeEventFee(Number(e.target.value))}
    />
    <button onClick={() => onClickNext()}>次へ</button>
  </div>
)
