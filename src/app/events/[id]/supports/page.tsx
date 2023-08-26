'use client'

import { ProductCard } from './_components/ProductCard'
import styles from './index.module.css'
import { useSupportProducts } from './_hooks/useSupportProducts'

const SupportsPage = () => {
  const { clickCheckBox, changeQuantity, clickBuyButton, selectedProducts, supportProducts } = useSupportProducts()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src='/images/present.svg' alt='present' />
        <p className={styles.header_title}>リターン選択</p>
        <span className={styles.header_tag}>必須</span>
      </div>
      <div className={styles.cards}>
        {supportProducts.map((supportProduct) => (
          <ProductCard
            key={supportProduct.id}
            id={supportProduct.id}
            amount={supportProduct.amount}
            imageUrl={supportProduct.imageUrl}
            name={supportProduct.name}
            content={supportProduct.content}
            quantity={supportProduct.quantity}
            isChecked={supportProduct.isChecked}
            onClickCheckBox={clickCheckBox}
            onChangeQuantity={changeQuantity}
          />
        ))}
        <button className={styles.button} onClick={clickBuyButton}>
          応援する
        </button>
      </div>
    </div>
  )
}

export default SupportsPage
