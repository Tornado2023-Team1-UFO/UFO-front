import { FC } from 'react'
import { Calculator } from './common/Calclulator'

type Props = {
  eventFee: number
  onClickPrice: (number: number) => void
  onClickNumber: (number: string) => void
  onClickDelete: () => void
}

export const EventFee: FC<Props> = ({ eventFee, onClickPrice, onClickDelete, onClickNumber }) => (
  <Calculator
    value={eventFee}
    unit='円'
    onClickNumber={onClickNumber}
    onClickChoice={onClickPrice}
    onClickDelete={onClickDelete}
    choices={[1000, 2000, 3000]}
  />
)
