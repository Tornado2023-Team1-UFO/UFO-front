'use client'

import { FC, PropsWithChildren, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/libs/firebase'
import { useAuth } from '@/app/_hooks/useAuth'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { registerUser } = useAuth()

  /*
   * 未ログインの場合はユーザー登録へ遷移
   * ログインしている場合はDBに管理者情報を保存する
   */
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/register')
        return
      }

      registerUser(user)
    })
  }, [])

  return <div>{children}</div>
}

export default Layout
