'use client'

import { nextApi } from '@/libs/axios'
import { ReturnRepository } from '@/repositories/ReturnRepository'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SupportProduct } from './_models/SupportProduct'
import { ProductCard } from './_components/ProductCard'
import styles from './index.module.css'

const SupportsPage = () => {
  const { id } = useParams()
  const [supportProducts, setSupportProducts] = useState<SupportProduct[]>([])
  const [selectedProducts, setSelectedProducts] = useState<SupportProduct[]>([])

  const fetchReturns = async () => {
    const data = await ReturnRepository.getReturns(id as string)
    setSupportProducts(data)
  }
  useEffect(() => {
    fetchReturns()
  }, [])

  const clickCheckBox = (id: string) => {
    const newSupportProducts = supportProducts.map((supportProduct) => {
      if (supportProduct.id === id) {
        supportProduct.isChecked = !supportProduct.isChecked
      }
      return supportProduct
    })
    setSupportProducts(newSupportProducts)

    const newSelectedProducts = supportProducts.filter(
      (supportProduct) => supportProduct.isChecked && supportProduct.quantity > 0,
    )
    setSelectedProducts(newSelectedProducts)
  }

  const changeQuantity = (id: string, quantity: number) => {
    if (quantity < 0) return

    const newSupportProducts = supportProducts.map((supportProduct) => {
      if (supportProduct.id === id) {
        supportProduct.quantity = quantity
      }
      return supportProduct
    })
    setSupportProducts(newSupportProducts)

    const newSelectedProducts = supportProducts.filter(
      (supportProduct) => supportProduct.isChecked && supportProduct.quantity > 0,
    )
    setSelectedProducts(newSelectedProducts)
  }

  const clickBuyButton = async () => {
    const { data } = await nextApi.post('/payments', {
      products: selectedProducts,
      id: id,
    })

    window.location.assign(data.url)
  }

  const disabled = selectedProducts.length === 0
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src='/images/present.svg' alt='present' />
        <p className={styles.heder_title}>リターン選択</p>
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
        <button
          className={styles.button}
          style={{
            backgroundColor: disabled ? '#9b9b9b' : '#ADCDEC',
          }}
          disabled={disabled}
          onClick={clickBuyButton}
        >
          購入する
        </button>
      </div>
    </div>
  )
}

export default SupportsPage
