'use client'

import { FC, PropsWithChildren, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/libs/firebase'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  /*
   * 未ログインの場合は管理者登録へ遷移
   */
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/admins/register')
      }
    })
  }, [])

  return <div>{children}</div>
}

export default Layout
