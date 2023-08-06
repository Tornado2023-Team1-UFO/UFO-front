'use client'

import Link from 'next/link'
import 'ress'

export default function Home() {
  return (
    <main>
      <Link href='/admins/register'>管理者登録</Link>
    </main>
  )
}
