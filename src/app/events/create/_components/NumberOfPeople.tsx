import { FC } from 'react'

type Props = {
  numberOfPeople: number
  onChangeNumberOfPeople: (numberOfPeople: number) => void
  onClickNext: () => void
}

export const NumberOfPeople: FC<Props> = ({ numberOfPeople, onChangeNumberOfPeople, onClickNext }) => (
  <div>
    ぼしゅう人数
    <input
      style={{ backgroundColor: 'white' }}
      type='number'
      value={numberOfPeople > 0 ? numberOfPeople : ''}
      onChange={(e) => onChangeNumberOfPeople(Number(e.target.value))}
    />
    <button onClick={() => onClickNext()}>次へ</button>
  </div>
)
