import { FC } from 'react'

type Props = {
  startAt: string
  endAt: string
  onChangeStartAt: (eventDate: string) => void
  onChangeEndAt: (eventDate: string) => void
  onClickNext: () => void
}

export const EventDate: FC<Props> = ({ startAt, endAt, onChangeStartAt, onChangeEndAt, onClickNext }) => (
  <div>
    イベントの日時
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
    <button onClick={() => onClickNext()}>次へ</button>
  </div>
)
