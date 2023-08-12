import { FC } from 'react'

type Props = {
  region: string
  onChangeRegion: (region: string) => void
  onClickNext: () => void
}

export const EventPlace: FC<Props> = ({ region, onChangeRegion, onClickNext }) => {
  return (
    <div>
      <p>現在: {region}</p>
      <h1 onClick={() => onChangeRegion('北海道 東北')}>北海道・東北エリア</h1>
      <h1 onClick={() => onChangeRegion('関東')}>関東エリア</h1>
      <h1 onClick={() => onChangeRegion('中部')}>中部エリア</h1>
      <h1 onClick={() => onChangeRegion('関西')}>関西エリア</h1>
      <h1 onClick={() => onChangeRegion('中国 四国')}>中国・四国エリア</h1>
      <h1 onClick={() => onChangeRegion('九州 沖縄')}>九州・沖縄エリア</h1>
      <button onClick={() => onClickNext()}>つぎへ</button>
    </div>
  )
}
