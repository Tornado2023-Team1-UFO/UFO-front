'use client'

import { useEffect } from 'react'
import { useAuth } from '@/app/_hooks/useAuth'
import { useRouter } from 'next/navigation'
import { auth } from '@/libs/firebase'

const Register = () => {
  const { loginWithGoogle } = useAuth()
  const router = useRouter()

  /*
   * ログイン済みの場合はrootへ遷移
   */
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/')
      }
    })
  }, [])

  return (
    <div>
      <h1>ユーザ登録</h1>
      <button onClick={() => loginWithGoogle()}>Googleでログイン</button>
    </div>
  )
}

export default Register
