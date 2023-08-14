import { ChangeEvent, FC } from 'react'

type Props = {
  imageUrls: string[]
  onClickFileUpload: (e: ChangeEvent<HTMLInputElement>) => void
}

export const EventImage: FC<Props> = ({ imageUrls, onClickFileUpload }) => (
  <div>
    イベントの画像
    {imageUrls.map((imageUrl) => (
      <img key={imageUrl} src={imageUrl} />
    ))}
    <input
      style={{
        backgroundColor: 'white',
      }}
      type='file'
      onChange={(e) => onClickFileUpload(e)}
    />
  </div>
)
