import styles from './Header.module.css'
import Link from 'next/link'
import Login from './Login'
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs'

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <p>
            <Link className={styles.link} href='/events'>
              ロゴ
            </Link>
          </p>
        </div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Login />
        </SignedOut>
      </header>
    </>
  )
}
