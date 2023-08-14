import { FC } from 'react'
import { Event } from '../_hooks/useEventCreate'

type Props = {
  event: Event
  onChangeSnsLink: (snsLink: string) => void
  onChangeMovieLink: (movieLink: string) => void
  onClickSubmit: () => void
}

export const EventConfirmation: FC<Props> = ({ event, onChangeSnsLink, onChangeMovieLink, onClickSubmit }) => (
  <div>
    <h1>確認画面</h1>
    タイトル
    <h1>{event.title}</h1>
    日時
    <h1>{event.startAt}</h1>
    <h1>{event.endAt}</h1>
    募集人数
    <h1>{event.recruitPeopleCount}</h1>
    参加費
    <h1>{event.eventFee}</h1>
    画像1枚目
    <img src={event.imageUrls[0]} alt='event' />
    説明
    <h1>{event.description}</h1>県<h1>{event.prefecture}</h1>
    <p>sns</p>
    <input
      style={{ backgroundColor: 'white' }}
      type='text'
      value={event.snsLink}
      onChange={(e) => onChangeSnsLink(e.target.value)}
    />
    <p>動画</p>
    <input
      style={{
        backgroundColor: 'white',
      }}
      type='text'
      value={event.movieLink}
      onChange={(e) => onChangeMovieLink(e.target.value)}
    />
    <button onClick={() => onClickSubmit()}>公開</button>
  </div>
)
