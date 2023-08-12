import { SupportProduct } from '@/app/events/[id]/supports/_models/SupportProduct'
import { stripe } from '@/libs/stripe'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const data: {
    products: SupportProduct[]
  } = await req.json()

  const products = data.products
  if (!products) throw new Error('productsが設定されていません。')

  let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []
  for (const product of products) {
    const stripeProduct = await stripe.products.create({
      name: product.name,
    })
    const stripePrice = await stripe.prices.create({
      unit_amount: product.amount,
      currency: 'jpy',
      product: stripeProduct.id,
      nickname: product.nickname,
    })

    lineItems.push({
      price: stripePrice.id,
      quantity: product.quantity,
    })
  }

  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_WEB_URL}/events/supports/success`,
    line_items: lineItems,
    mode: 'payment',
  })

  return NextResponse.json({
    url: session.url,
  })
}
