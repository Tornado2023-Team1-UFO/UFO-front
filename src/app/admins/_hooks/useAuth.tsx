import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { auth } from '@/libs/firebase'

export const useAuth = () => {
  /*
   * ログアウト
   * 管理者登録へ遷移
   * */
  const Logout = async () => {
    await auth.signOut()
    router.push('/admins/register')
  }

  /*
   * Googleでログイン
   * 管理者Topへ遷移
   * */
  const router = useRouter()
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()

    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      // TODO: ログイン後の処理
      // DBに管理者情報を保存するなど
      console.log(user)
      router.push('/admins')
    } catch (error) {
      // TODO: エラー処理
      console.error(error)
    }
  }

  return { Logout, loginWithGoogle }
}
