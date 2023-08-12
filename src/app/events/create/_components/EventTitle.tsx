import { FC } from 'react'

type Props = {
  title: string
  onChangeTitle: (title: string) => void
  onClickNext: () => void
}

export const EventTitle: FC<Props> = ({ title, onChangeTitle, onClickNext }) => (
  <div>
    イベントのタイトル
    <input
      style={{ backgroundColor: 'white' }}
      type='text'
      value={title}
      onChange={(e) => onChangeTitle(e.target.value)}
    />
    <button onClick={() => onClickNext()}>次へ</button>
  </div>
)
