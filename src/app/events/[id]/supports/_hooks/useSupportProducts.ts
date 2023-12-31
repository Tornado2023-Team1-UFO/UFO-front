import { nextApi } from '@/libs/axios'
import { ReturnRepository } from '@/repositories/ReturnRepository'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SupportProduct } from '../_models/SupportProduct'
import { toast } from 'react-hot-toast'

type ReturnType = {
  /*
   * 全ての商品
   */
  supportProducts: SupportProduct[]
  /*
   * 購入ボタンをクリックしたときの処理
   */
  clickBuyButton: () => void

  /*
   * 選択された商品
   */
  selectedProducts: SupportProduct[]

  /*
   * 商品をクリックしたときの処理
   */
  clickCheckBox: (id: string) => void

  /*
   * 数量を変更したときの処理
   */
  changeQuantity: (id: string, quantity: number) => void
}

export const useSupportProducts = (): ReturnType => {
  const { id } = useParams()
  const [supportProducts, setSupportProducts] = useState<SupportProduct[]>([])
  const [selectedProducts, setSelectedProducts] = useState<SupportProduct[]>([])
  const router = useRouter()
  const fetchReturns = async () => {
    const data = await ReturnRepository.getReturns(id as string)
    if (data.length === 0) {
      toast.error('このイベントは支援を受け付けていません')
      router.push(`/events/${id}`)
    }
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
    if (selectedProducts.length === 0) {
      toast.error('支援する商品を選択してください')
      return
    }
    const { data } = await nextApi.post('/payments', {
      products: selectedProducts,
      id: id,
    })

    window.location.assign(data.url)
  }

  return {
    supportProducts,
    clickBuyButton,
    selectedProducts,
    clickCheckBox,
    changeQuantity,
  }
}
