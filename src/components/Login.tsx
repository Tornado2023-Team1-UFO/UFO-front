import { Path } from '@/constants/path'
import styles from './login.module.css'
import Link from 'next/link'

export default function Login() {
  return (
    <div className={styles.login}>
      <Link className={styles.link} href={Path.SIGNIN}>
        ログイン
      </Link>
      <span className={styles.link}> / </span>
      <Link className={styles.link} href={Path.SIGNUP}>
        新規会員登録
      </Link>
    </div>
  )
}
