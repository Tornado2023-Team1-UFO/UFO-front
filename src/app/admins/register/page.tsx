'use client'

import { useEffect } from 'react'
import { useAuth } from '@/app/admins/_hooks/useAuth'
import { useRouter } from 'next/navigation'
import { auth } from '@/libs/firebase'

const Register = () => {
  const { loginWithGoogle } = useAuth()
  const router = useRouter()

  /*
   * ログイン済みの場合は管理者Topへ遷移
   */
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/admins')
      }
    })
  }, [])

  return (
    <div>
      <h1>管理者登録</h1>
      <button onClick={() => loginWithGoogle()}>Googleでログイン</button>
    </div>
  )
}

export default Register
