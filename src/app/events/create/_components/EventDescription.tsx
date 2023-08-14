import { FC } from 'react'

type Props = {
  description: string
  onChangeDescription: (description: string) => void
}

export const EventDescription: FC<Props> = ({ onChangeDescription, description }) => {
  return (
    <div>
      イベントの説明
      <textarea
        style={{ backgroundColor: 'white', height: '200px' }}
        onChange={(e) => onChangeDescription(e.target.value)}
        value={description}
      />
    </div>
  )
}
