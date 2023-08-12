export class SupportProduct {
  id!: string
  name!: string
  imageUrl!: string
  amount!: number
  nickname!: string
  content!: string
  quantity!: number
  isChecked!: boolean

  constructor(supportProduct: Partial<SupportProduct>) {
    Object.assign(this, supportProduct)
  }
}
