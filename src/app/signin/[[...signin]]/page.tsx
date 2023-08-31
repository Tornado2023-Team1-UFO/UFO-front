import React from 'react'
import styles from './page.module.css'
import { SignIn } from '@clerk/nextjs'
import { Path } from '@/constants/path'

export default function Page() {
  return (
    <div className={styles.center}>
      <SignIn afterSignInUrl={Path.EVENT_LIST} />
    </div>
  )
}
