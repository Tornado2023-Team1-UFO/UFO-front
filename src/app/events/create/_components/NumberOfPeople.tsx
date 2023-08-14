import { FC } from 'react'
import { Title } from './common/Title'

type Props = {
  numberOfPeople: number
  onChangeNumberOfPeople: (numberOfPeople: number) => void
  onClickPrev: () => void
  onClickNext: () => void
}

export const NumberOfPeople: FC<Props> = ({ numberOfPeople, onChangeNumberOfPeople, onClickNext, onClickPrev }) => (
  <div>
    <Title title='目標参加人数は？' />
    <input
      style={{ backgroundColor: 'white' }}
      type='number'
      value={numberOfPeople > 0 ? numberOfPeople : ''}
      onChange={(e) => onChangeNumberOfPeople(Number(e.target.value))}
    />
  </div>
)
