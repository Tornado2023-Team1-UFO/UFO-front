import { FC } from 'react'

type Props = {
  prefectures: string[]
  selectedPrefecture: string
  onChangePrefecture: (prefecture: string) => void
  onClickNext: () => void
}

export const EventPlaceDetail: FC<Props> = ({ prefectures, selectedPrefecture, onChangePrefecture, onClickNext }) => (
  <div>
    <p>現在 {selectedPrefecture}</p>
    {prefectures.map((prefecture) => (
      <h1 onClick={() => onChangePrefecture(prefecture)}>{prefecture}</h1>
    ))}
    <button onClick={() => onClickNext()}>次へ</button>
  </div>
)
