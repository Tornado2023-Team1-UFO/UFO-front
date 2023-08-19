'use client'

import styles from './Header.module.css'
import Link from 'next/link'
import Login from './Login'
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { Path } from '@/constants/path'
// header fix
export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <p>
            <Link className={styles.link} href={Path.EVENT_LIST}>
              ロゴ
            </Link>
          </p>
        </div>
        <SignedIn>
          <UserButton afterSignOutUrl={Path.EVENT_LIST} />
        </SignedIn>
        <SignedOut>
          <Login />
        </SignedOut>
      </header>
    </>
  )
}
