import { FC } from 'react'
import styles from './productCard.module.css'
import Select from 'react-select'

type Props = {
  id: string
  amount: number
  imageUrl: string
  name: string
  content: string
  quantity: number
  isChecked: boolean
  onClickCheckBox: (id: string) => void
  onChangeQuantity: (id: string, quantity: number) => void
}

const options = [
  { value: '1', label: '1個' },
  { value: '2', label: '2個' },
  { value: '3', label: '3個' },
  { value: '4', label: '4個' },
  { value: '5', label: '5個' },
]

export const ProductCard: FC<Props> = ({
  onClickCheckBox,
  onChangeQuantity,
  id,
  amount,
  imageUrl,
  name,
  content,
  quantity,
  isChecked,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.amount}>
        <input type='checkbox' checked={isChecked} onChange={() => onClickCheckBox(id)} />
        {amount}
      </div>
      <div className={styles.quantity}>
        <p>数量</p>
        <Select defaultValue={options[0]} options={options} onChange={(e) => onChangeQuantity(id, Number(e?.value))} />
      </div>

      <img className={styles.image} src={imageUrl} alt={name} />
      <div>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.content}>{content}</p>
      </div>
    </div>
  )
}
