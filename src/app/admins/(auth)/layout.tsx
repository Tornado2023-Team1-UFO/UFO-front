'use client'

import { FC, PropsWithChildren, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth, db } from '@/libs/firebase'
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import { useAuth } from '@/app/admins/_hooks/useAuth'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { registerAdminUser } = useAuth()

  /*
   * 未ログインの場合は管理者登録へ遷移
   * ログインしている場合はDBに管理者情報を保存する
   */
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/admins/register')
        return
      }

      registerAdminUser(user)
    })
  }, [])

  return <div>{children}</div>
}

export default Layout
