'use client'

import Link from 'next/link'
import 'ress'
import { useAuth } from '@/app/_hooks/useAuth'

export default function Home() {
  const { Logout } = useAuth()

  return (
    <main>
      <Link href='/register'>新規登録</Link>
      <button onClick={() => Logout()}>Logout</button>
    </main>
  )
}
