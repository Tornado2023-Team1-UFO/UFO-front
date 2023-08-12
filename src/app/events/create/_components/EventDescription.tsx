import { FC } from 'react'

type Props = {
  description: string
  onChangeDescription: (description: string) => void
  onClickNext: () => void
}

export const EventDescription: FC<Props> = ({ onChangeDescription, onClickNext, description }) => {
  return (
    <div>
      イベントの説明
      <textarea
        style={{ backgroundColor: 'white' }}
        onChange={(e) => onChangeDescription(e.target.value)}
        value={description}
      />
      <button onClick={() => onClickNext()}>次へ</button>
    </div>
  )
}
