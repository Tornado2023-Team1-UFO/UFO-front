import { ChangeEvent, FC } from 'react'

type Props = {
  imageUrls: string[]
  onClickFileUpload: (e: ChangeEvent<HTMLInputElement>) => void
  onClickNext: () => void
}

export const EventImage: FC<Props> = ({ imageUrls, onClickFileUpload, onClickNext }) => (
  <div>
    イベントの画像
    {imageUrls.map((imageUrl) => (
      <img src={imageUrl} />
    ))}
    <input
      style={{
        backgroundColor: 'white',
      }}
      type='file'
      onChange={(e) => onClickFileUpload(e)}
    />
    <button onClick={() => onClickNext()}>つぎへ</button>
  </div>
)
