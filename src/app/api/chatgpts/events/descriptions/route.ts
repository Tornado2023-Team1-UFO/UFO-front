import { openai } from '@/libs/openai'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const data: {
    message: any
  } = await req.json()

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: data.message }],
    })

    return NextResponse.json(completion.data.choices[0].message)
  } catch (e) {
    console.log(e)
    return NextResponse.json({ error: e })
  }
}
