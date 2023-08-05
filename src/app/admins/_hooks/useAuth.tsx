import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { auth, db } from '@/libs/firebase'
import { setDoc, doc, Timestamp } from 'firebase/firestore'

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

      // DBに管理者情報を保存する
      await registerAdminUser(user)

      router.push('/admins')
    } catch (error) {
      console.error(error)
    }
  }

  const registerAdminUser = async (user: User) => {
    const adminRef = doc(db, 'admins', `${user.uid}`)
    await setDoc(adminRef, {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    })
  }

  return { Logout, loginWithGoogle, registerAdminUser }
}
