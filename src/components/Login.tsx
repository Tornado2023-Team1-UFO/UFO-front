import { Path } from '@/constants/path'
import styles from './header.module.css'
import Link from 'next/link'
import { FiLogIn } from 'react-icons/fi'

export default function Login() {
  return (
    <div className={styles.login}>
      <FiLogIn className={styles.icon} />
      <Link className={styles.link} href={Path.SIGNIN}>
        ログイン
      </Link>
      <span> / </span>
      <Link className={styles.link} href={Path.SIGNUP}>
        新規会員登録
      </Link>
    </div>
  )
}
