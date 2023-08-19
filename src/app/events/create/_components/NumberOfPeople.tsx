import { FC } from 'react'
import { Title } from './common/Title'
import { Calculator } from './common/Calclulator'

type Props = {
  numberOfPeople: number
  onClickPeople: (numberOfPeople: number) => void
  onClickNumber: (number: string) => void
  onClickDelete: () => void
}

export const NumberOfPeople: FC<Props> = ({ numberOfPeople, onClickPeople, onClickNumber, onClickDelete }) => (
  <Calculator
    value={numberOfPeople}
    unit='人'
    choices={[10, 20, 30]}
    onClickNumber={onClickNumber}
    onClickChoice={onClickPeople}
    onClickDelete={onClickDelete}
  />
)
