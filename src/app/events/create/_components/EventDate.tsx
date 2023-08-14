import { FC } from 'react'
import { Title } from './common/Title'

type Props = {
  startAt: string
  endAt: string
  onChangeStartAt: (eventDate: string) => void
  onChangeEndAt: (eventDate: string) => void
}

export const EventDate: FC<Props> = ({ startAt, endAt, onChangeStartAt, onChangeEndAt }) => (
  <div>
    <Title title='開催日はいつ？' />
    <input
      style={{
        backgroundColor: 'white',
      }}
      type='date'
      value={startAt}
      onChange={(e) => onChangeStartAt(e.target.value)}
    />
    から
    <input
      style={{
        backgroundColor: 'white',
      }}
      type='date'
      value={endAt}
      onChange={(e) => onChangeEndAt(e.target.value)}
    />
    まで
  </div>
)
