import { FC } from 'react'
import styles from './productCard.module.css'
import { InputNumber } from 'primereact/inputnumber'

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
        数量
        <InputNumber
          value={quantity > 0 ? quantity : 0}
          onValueChange={(e) => onChangeQuantity(id, Number(e.value))}
          showButtons
          buttonLayout='vertical'
          size={2}
          className={styles.quantity_input}
          min={1}
          max={100}
        />
      </div>

      <img className={styles.image} src={imageUrl} alt={name} />
      <div>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.content}>{content}</p>
      </div>
    </div>
  )
}
