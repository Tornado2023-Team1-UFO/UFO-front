import { FC } from 'react'

type Props = {
  prefectures: string[]
  selectedPrefecture: string
  onChangePrefecture: (prefecture: string) => void
}

export const EventPlaceDetail: FC<Props> = ({ prefectures, selectedPrefecture, onChangePrefecture }) => (
  <div>
    <p>現在 {selectedPrefecture}</p>
    {prefectures.map((prefecture) => (
      <h1 key={prefecture} onClick={() => onChangePrefecture(prefecture)}>
        {prefecture}
      </h1>
    ))}
  </div>
)
