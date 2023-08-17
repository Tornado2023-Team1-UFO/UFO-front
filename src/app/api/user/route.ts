import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch('https://play.svix.com/in/e_hlCdBNESo7j6fgfpv4ohu4BPuY7/', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const data = await res.json()

  return NextResponse.json({ data })
}
