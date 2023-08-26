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
  const price = new Intl.NumberFormat().format(amount) + '円'
  return (
    <div className={styles.card}>
      <div className={styles.amount}>
        <div>
          <input className={styles.chkbox} type='checkbox' checked={isChecked} onChange={() => onClickCheckBox(id)} />
          <label htmlFor='checkbox'> {price}</label>
        </div>
        <div className={styles.select_box}>
          <select onChange={(e) => onChangeQuantity(id, Number(e.target.value))}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.content}>
        <img className={styles.image} src={imageUrl} alt={name} />
        <h1 className={styles.title}>【{name}】</h1>
        <p className={styles.content}>{content}</p>
      </div>
    </div>
  )
}
